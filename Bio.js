const Model = require("./schema.js").model
const { Card, Suggestion } = require("dialogflow-fulfillment");

exports.bio = async (agent) => {
    const name = agent.parameters['name'];
    const rollNo = agent.parameters['rollNo'];
    const quizType = agent.parameters['quiztype'];
    const email = agent.parameters['email'];
    // var ourContext = agent.getContext("abc")
    if (!name) {
        agent.add("Kindly say your good name")
    }
    else if (!rollNo) {
        agent.add("Please tell me your Roll No")
    }
    else if (!quizType) {
        await Model.find({ Roll_No: agent.parameters.rollNo }).lean().then(data => {
            console.log("data is", data)
            if (!data[0] || agent.parameters.ask == 'no') {
                console.log("else trig")
                agent.add("Please select the Subject in which you want to give quiz")
                agent.add(new Suggestion(`G-K`));
                agent.add(new Suggestion(`Science`));
                agent.add(new Suggestion(`History`));
            }
            else {
                var gkCh = data[0].Total_Score_in_GK
                var sciCh = data[0].Total_Score_in_Science
                var hisCh = data[0].Total_Score_in_History
                if (agent.parameters.ask == 'yes') {
                    agent.add(`Name: ${data[0].Name}
                               Roll No: ${data[0].Roll_No} 
                               Total Score in GK: ${gkCh}
                               Total Score in Science: ${sciCh}
                               Total Score in History: ${hisCh}. Do you want to try from below:`)
                    agent.add(new Suggestion(`G-K`));
                    agent.add(new Suggestion(`Science`));
                    agent.add(new Suggestion(`History`));
                }
                else if (gkCh != 'Quiz not given' && sciCh == 'Quiz not given' && hisCh == 'Quiz not given') {
                    conv("Gk", agent)
                    return
                }
                else if (gkCh != 'Quiz not given' && sciCh != 'Quiz not given' && hisCh == 'Quiz not given') {
                    conv("Gk and Science", agent)
                    return
                }
                else if (gkCh != 'Quiz not given' && sciCh == 'Quiz not given' && hisCh != 'Quiz not given') {
                    conv("Gk and History", agent)
                    return
                }
                else if (gkCh == 'Quiz not given' && sciCh != 'Quiz not given' && hisCh == 'Quiz not given') {
                    conv("Science", agent)
                    return
                }
                else if (gkCh == 'Quiz not given' && sciCh == 'Quiz not given' && hisCh != 'Quiz not given') {
                    conv("History", agent)
                    return
                }
                else if (gkCh == 'Quiz not given' && sciCh != 'Quiz not given' && hisCh != 'Quiz not given') {
                    conv("Science and History", agent)
                    return
                }
                else if (gkCh != 'Quiz not given' && sciCh != 'Quiz not given' && hisCh != 'Quiz not given') {
                    conv("all three", agent)
                    return
                }
            }
        }).catch(err => {
            console.log("error is : ", err)
        })
    }
    else if (quizType) {
        agent.add(`Here is the overview of your quiz. You'll be ask 10 questions one by one.
         Each question has three options to answer.Say "read the question" to listen a question and to listen again
         say "read this question again".To answer a question say "option 1 or 2" etc. You can skip any question by
         saying "skip this question".You can find your status at any time by saying "what is my status".
         You can end the quiz by saying "Finish the quiz". After completing quiz say "Review quiz" to review the questions.
         To start quiz say "start quiz"`)
        }
    else {
        agent.add(`The Subject of your quiz is ${quizType}.`)
    }
    agent.setContext({
        name: "abc",
        lifespan: 5,
        "parameters": {
            "Name": name,       //setting name and other params in context for use later in code
            "Roll_No": rollNo,
            "Email": email,
            "Subject": quizType
        }
    });
}

async function conv(value, agent) {
    var msg = `You have already given ${value} quiz.To see your previous record say yes`
    agent.add(msg)
    return

}