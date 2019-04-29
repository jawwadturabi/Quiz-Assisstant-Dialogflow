const Model = require("./schema.js").model

exports.bio = async (agent) => {
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

        await Model.find({ Roll_No: agent.parameters.idNo }).lean().then(data => {
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
}

async function conv(value, agent) {
    var msg = `You have already given ${value} quiz.To see your previous record say yes`
    agent.add(msg)
    return

}