const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require('dialogflow-fulfillment');
const app = express().use(bodyParser.json());
var postmark = require("postmark");
process.env.DEBUG = "dialogflow:debug"
const mongoose = require("mongoose");
const dburi = "mongodb+srv://author:author123@cluster0-geoiq.mongodb.net/test?retryWrites=true";
const G_K = require("./G-K")
const Science = require("./Science")
const hist = require("./History")
const biod = require("./Bio")
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

app.post("/webhook", function (request, response) {
    const _agent = new WebhookClient({ request, response });

    function welcome(agent) {
        agent.add(`Hi! I'm your quiz assistant.I will conduct your quiz,
        Please tell me your name and roll no.`)
        return
    }

    async function Bio(agent) {
        await biod.bio(agent)
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

    function questionYes(agent) {
        const email = agent.parameters['email'];
        const finalScore = ourContext.parameters.score10
        var client = new postmark.ServerClient("e6a1e031-f7f7-4ffe-81db-6b8e4f212fc0");
        if (!email) {
            agent.add("Please let me know your email address")
        }
        client.sendEmail({
            "From": "info@abcquiz.tk",
            "To": email,
            "Subject": "Test",
            "TextBody": `Congratulations you passed the quiz and answered all 10 questions, ${finalScore} out of 10 was correct, 
        Your score is ${(finalScore * 100) / 10}%`
        });
        agent.add(`Email is successfully sent. Thanks for giving quiz, Bye bye `);
    }
    let intents = new Map();
    intents.set("Default Welcome Intent", welcome);
    intents.set("Start-quiz", startQuiz);
    intents.set("question", question)
    intents.set("question - yes", questionYes)
    intents.set("Bio", Bio)
    _agent.handleRequest(intents)
})
app.listen(process.env.PORT || 3043, function () {
    console.log("server is running")
})


