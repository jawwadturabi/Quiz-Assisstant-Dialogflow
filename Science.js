var postmark = require("postmark");
process.env.DEBUG = "dialogflow:debug"
// const dburi = "mongodb+srv://author:author123@cluster0-geoiq.mongodb.net/test?retryWrites=true";
exports.science = async (agent) => {
    var ourContext = agent.getContext("abc")
    var score = 0;
    var increment = 1;
    var i = 0;
    var i1; var i2; var i3; var i4; var i5; var i6; //differnt variables to store in context
    var i7; var i8; var i9;
    var score1; var score2; var score3; var score4; var score5;
    var score6; var score7; var score8; var score9; var score10;
    const opt = agent.parameters['option'];
    const ask = agent.parameters['ask'];
    if (!opt && !ask) {
        console.log("ques 1 triggered")
        console.log("context are : ", ourContext)
        await model1.find({}).then(data => {
            agent.add(`${data[1].Question[i]}`)
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (opt && !ourContext.parameters.opt1) {
        i1 = i + increment
        console.log("ques 2 triggered")
        console.log("context are : ", ourContext)
        if (opt === "3" && !ourContext) {
            score1 = score + increment

        }
        else {
            score1 = score
        }
        await model1.find({}).then(data => {
            agent.add(`You saRoll_No option ${opt}, Here is your next question.${data[1].Question[i1]}`)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt1": opt, i1,
                    score1
                }
            });
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (ourContext.parameters.opt1 && !ourContext.parameters.opt2) {
        i2 = ourContext.parameters.i1 + increment
        console.log("value of i is :", i)
        console.log("ques 3 triggered")
        console.log("context are : ", ourContext)
        if (opt === "2" && !ourContext.parameters.opt2) {
            score2 = ourContext.parameters.score1 + increment

        }
        else {
            score2 = ourContext.parameters.score1
        }
        await model1.find({}).then(data => {
            agent.add(`You said opt ${opt} . Here is your next question.${data[1].Question[i2]} `)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt2": opt, i2,
                    score2
                }
            })
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (ourContext.parameters.opt2 && !ourContext.parameters.opt3) {
        i3 = ourContext.parameters.i2 + increment
        console.log("value of i is :", i)
        console.log("ques 4 triggered")
        console.log("context are : ", ourContext)
        if (opt === "2" && !ourContext.parameters.opt3) {
            score3 = ourContext.parameters.score2 + increment

        }
        else {
            score3 = ourContext.parameters.score2
        }
        await model1.find({}).then(data => {
            agent.add(`You said opt ${opt}. Here is your next question.${data[1].Question[i3]} `)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt3": opt, i3,
                    score3
                }
            })
        }).catch(err => {
            console.log("Error is : ", err)
        })

    }

    else if (ourContext.parameters.opt3 && !ourContext.parameters.opt4) {
        i4 = ourContext.parameters.i3 + increment
        console.log("ques 5 triggered")
        console.log("context are : ", ourContext)
        if (opt === "1" && !ourContext.parameters.opt4) {
            score4 = ourContext.parameters.score3 + increment

        }
        else {
            score4 = ourContext.parameters.score3
        }
        await model1.find({}).then(data => {
            agent.add(`You said opt ${opt}.Here is your next question.${data[1].Question[i4]} `)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt4": opt, i4,
                    score4
                }
            });
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (ourContext.parameters.opt4 && !ourContext.parameters.opt5) {
        i5 = ourContext.parameters.i4 + increment
        console.log("ques 6 triggered")
        console.log("context are : ", ourContext)
        if (opt === "3" && !ourContext.parameters.opt5) {
            score5 = ourContext.parameters.score4 + increment

        }
        else {
            score5 = ourContext.parameters.score4
        }
        await model1.find({}).then(data => {
            agent.add(`You said opt ${opt}.Here is your next question.${data[1].Question[i5]}`)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt5": opt, i5,
                    score5
                }
            });
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (ourContext.parameters.opt5 && !ourContext.parameters.opt6) {
        i6 = ourContext.parameters.i5 + increment
        console.log("ques 7 triggered")
        console.log("context are : ", ourContext)
        if (opt === "2" && !ourContext.parameters.opt6) {
            score6 = ourContext.parameters.score5 + increment

        }
        else {
            score6 = ourContext.parameters.score5
        }
        await model1.find({}).then(data => {
            agent.add(`You said opt ${opt}.Here is your next question.${data[1].Question[i6]}`)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt6": opt, i6,
                    score6
                }
            });
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (ourContext.parameters.opt6 && !ourContext.parameters.opt7) {
        i7 = ourContext.parameters.i6 + increment
        console.log("ques 8 triggered")
        console.log("context are : ", ourContext)
        if (opt === "1" && !ourContext.parameters.opt7) {
            score7 = ourContext.parameters.score6 + increment

        }
        else {
            score7 = ourContext.parameters.score6
        }
        await model1.find({}).then(data => {
            agent.add(`You said opt ${opt}.Here is your next question.${data[1].Question[i7]}`)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt7": opt, i7,
                    score7
                }
            });
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (ourContext.parameters.opt7 && !ourContext.parameters.opt8) {
        i8 = ourContext.parameters.i7 + increment
        console.log("ques 9 triggered")
        console.log("context are : ", ourContext)
        if (opt === "3" && !ourContext.parameters.opt8) {
            score8 = ourContext.parameters.score7 + increment

        }
        else {
            score8 = ourContext.parameters.score7
        }
        await model1.find({}).then(data => {
            agent.add(`You said option ${opt}.Here is your next question.${data[1].Question[i8]} `)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt8": opt, i8,
                    score8
                }
            });
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (ourContext.parameters.opt8 && !ourContext.parameters.opt9) {
        i9 = ourContext.parameters.i8 + increment
        console.log("ques 10 triggered")
        console.log("context are : ", ourContext)
        if (opt === "2" && !ourContext.parameters.opt9) {
            score9 = ourContext.parameters.score8 + increment

        }
        else {
            score9 = ourContext.parameters.score8
        }
        await model1.find({}).then(data => {
            agent.add(`You said option ${opt}.Here is your next question.${data[1].Question[i9]}`)
            agent.setContext({
                name: "abc",
                lifespan: 5,
                "parameters": {
                    "opt9": opt, i9,
                    score9
                }
            });
        }).catch(err => {
            console.log("Error is : ", err)
        })
    }

    else if (ourContext.parameters.opt9 && !ourContext.parameters.opt10) {
        console.log("context are : ", ourContext)
        var name = ourContext.parameters.Name
        if (opt === "1" && !ourContext.parameters.opt10) {
            score10 = ourContext.parameters.score9 + increment
        }
        else {
            score10 = ourContext.parameters.score9
        }
        var info = {
            Name: name,
            Roll_No: ourContext.parameters.Roll_No,
            Total_Score_in_Science: score10
        }

        var saveData = new model(info);
        saveData.save((err, mydata) => {
            if (err) {
                console.log("error is:", err);
            }
            else {
                console.log("data is : ", mydata)
                return
            }
        });
        agent.add(`Congratulations you answered all 10 questions, ${score10} out of 10 was correct, 
    Your score is ${(score10 * 100) / 10}%, Do you want me to send your transcript in your email?`)
        agent.setContext({
            name: "abc",
            lifespan: 5,
            "parameters": {
                "opt10": opt, i,
                score10
            }
        });
    }

    else if (agent.parameters.ask === 'yes' && agent.parameters.ask) {
        const email = ourContext.parameters.Email
        const finalScore = ourContext.parameters.score10
        var client = new postmark.ServerClient("e6a1e031-f7f7-4ffe-81db-6b8e4f212fc0");

        client.sendEmail({
            "From": "info@abcquiz.tk",
            "To": email,
            "Subject": "Test",
            "TextBody": `Congratulations you passed the quiz and answered all 10 questions, ${finalScore} out of 10 was correct, 
        Your score is ${(finalScore * 100) / 10}%`
        });
        agent.add(`Email is successfully sent. Thanks for giving quiz, Bye bye `);
    }
    else if (agent.parameters.ask === 'no' && agent.parameters.ask) {
        agent.add("Thanks for giving quiz, Bye bye")
    }
}