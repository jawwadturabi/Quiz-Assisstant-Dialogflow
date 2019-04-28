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
const Model = require("./schema.js").model
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

app.post("/webhook", function (request, response, next) {
    const _agent = new WebhookClient({ request, response });

    function welcome(agent) {
        agent.add(`Hi! I'm your quiz assistant.I will conduct your general knowledge quiz,
        Please tell me your name, id no and email address.`)
        return
    }

    async function Bio(agent) {
        const name = agent.parameters['name'];
        const idNo = agent.parameters['idNo'];
        const quizType = agent.parameters['quiztype'];
        const email = agent.parameters['email'];
        // var ourContext = agent.getContext("abc")
        if (!name) {
            agent.add("Kindly say your good name")
        }
        else if (!idNo) {
            agent.add("Please tell me your Roll No")
        }
        else if (!email) {
            agent.add("Kindly tell me your email address")
        }
        else if (!quizType) {
            var gkCh = data[0].Total_Score_in_GK
            var sciCh = data[0].Total_Score_in_Science
            var hisCh = data[0].Total_Score_in_History
            await Model.find({ Roll_No: agent.parameters.idNo }).lean().then(data => {
                console.log("data is", data[0])
                if (data) {
                    if (gkCh !== 'Quiz not given' && sciCh === 'Quiz not given' && hisCh === 'Quiz not given') {
                        conv("Gk", agent)
                        return
                    }
                    else if (gkCh !== 'Quiz not given' && sciCh !== 'Quiz not given' && hisCh === 'Quiz not given') {
                        conv("Gk and Science", agent)
                        return
                    }
                    else if (gkCh !== 'Quiz not given' && sciCh === 'Quiz not given' && hisCh !== 'Quiz not given') {
                        conv("Gk and History", agent)
                        return
                    }
                    else if (gkCh === 'Quiz not given' && sciCh !== 'Quiz not given' && hisCh === 'Quiz not given') {
                        conv("Science", agent)
                        return
                    }
                    else if (gkCh === 'Quiz not given' && sciCh === 'Quiz not given' && hisCh !== 'Quiz not given') {
                        conv("History", agent)
                        return
                    }
                    else if (gkCh === 'Quiz not given' && sciCh !== 'Quiz not given' && hisCh !== 'Quiz not given') {
                        conv("Science and History", agent)
                        return
                    }
                    else if (gkCh !== 'Quiz not given' && sciCh !== 'Quiz not given' && hisCh !== 'Quiz not given') {
                        conv("all three", agent)
                        return
                    }
                }
                    else {
                        console.log("else trig")
                        agent.add("Please select the Subject in which you want to give quiz")
                        agent.add(new Suggestion(`G-K`));
                        agent.add(new Suggestion(`Science`));
                        agent.add(new Suggestion(`History`));
                    }
                }).catch(err => {
                    console.log("error is : ", err)
                })

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
            await G_K.gk(agent)
        }
        else if (ourContext.parameters.Subject === "Science") {
            await Science.science(agent)
        }
        else if (ourContext.parameters.Subject === "History") {
            await hist.history(agent)
        }
        return

    }

    async function conv(value, agent) {
        var msg = `You have already given ${value} quiz. You want to try again or anyone else select from below`
        agent.add(msg)
        agent.add(new Suggestion(`G-K`));
        agent.add(new Suggestion(`Science`));
        agent.add(new Suggestion(`History`));
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


