const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require("dialogflow-fulfillment");
const app = express().use(bodyParser.json());
var postmark = require("postmark");
process.env.DEBUG = "dialogflow:debug"
require("dotenv").config()
const mongoose = require("mongoose");
const dburi = "mongodb+srv://author:author123@cluster0-geoiq.mongodb.net/test?retryWrites=true";
const G_K = require("./G-K")
const Science = require("./Science")
const hist = require("./History")
//connection with mongodb
mongoose.connect(dburi, { useNewUrlParser: true }).catch(err => {
    console.log("error occured", err);
});
mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
})
mongoose.connection.on("connected", () => {
    console.log("Connected with database");

});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected with database.");
    process.exit(1);
});
var userDetail = new mongoose.Schema(
    {
        Name: { type: String, required: true },
        Roll_No: { type: String, required: true },
        Total_Score_in_History: { type: String, required: true },
    },
    { collection: "userData" }
);
var model =  new mongoose.model("userData", userDetail);
//making schema for collection already exist in db
var userDetail1 = new mongoose.Schema(
    {
        Question: { type: [String], required: true },
    },
    { collection: "Questions" }
);
var model1 = new mongoose.model("Questions", userDetail1);
module.exports ={
    model:model,
    model1:model1
}

app.post("/webhook", function (request, response, next) {
    const _agent = new WebhookClient({ request, response });

    function welcome(agent) {
        agent.add(`Hi! I'm your quiz assistant.I will conduct your general knowledge quiz,
        Please tell me your name, id no and email address.`)
        return
    }

    function Bio(agent) {

        const name = agent.parameters['name'];
        const idNo = agent.parameters['idNo'];
        const quizType = agent.parameters['quiztype'];
        const email = agent.parameters.email;
        if (!name) {
            agent.add("Kindly say your good name")
        }
        else if (!idNo) {
            agent.add("Please tell me your ID No")
        }
        else if (!email) {
            agent.add("Kindly tell me your email address")
        }
        else if (!quizType) {
            agent.add("Please select the Subject in which you want to give quiz")
            agent.add(new Suggestion(`G-K`));
            agent.add(new Suggestion(`Science`));
            agent.add(new Suggestion(`History`));
        }
        else {
            agent.add(`The Subject of your quiz is ${quizType}.Say start quiz when you are ready`)
        }
        agent.setContext({
            name: "abc",
            lifespan: 5,
            "parameters": {
                "Name": name,       //setting name and other params in context for use later in code
                "Roll_No": idNo,
                "Email": email,
                "Subject": quizType
            }
        });
        return
    }

    function startQuiz(agent) {
        agent.setFollowupEvent("question") //webhook call for this intent redirect to ques
        agent.add("hi from twilio")
        return
    }

    async function question(agent) {
        var ourContext = agent.getContext("abc")
        if (ourContext.parameters.Subject === "G-K") {
          await  G_K.gk(agent)
        }
        else if(ourContext.parameters.Subject === "Science"){
            await  Science.science(agent)
        }
        else if(ourContext.parameters.Subject === "History"){
            await  hist.history(agent)
        }
        return

    }

    let intents = new Map();
    intents.set("Default Welcome Intent", welcome);
    intents.set("Start-quiz", startQuiz);
    intents.set("question", question)
    intents.set("Bio", Bio)
    _agent.handleRequest(intents)
})

app.listen(process.env.PORT || 3043, function () {
    console.log("server is running")
})

