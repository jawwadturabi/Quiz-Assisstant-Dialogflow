const mongoose = require("mongoose");
////////
var userDetail = new mongoose.Schema(
    {
        Name: { type: String, required: true },
        Roll_No: { type: String, required: true },
        Total_Score_in_GK: { type: String, required: true },
    },
    { collection: "userData" }
);
var modelGk = new mongoose.model("G-K", userDetail,"userData");
//////////
var userDetail2 = new mongoose.Schema(
    {
        Name: { type: String, required: true },
        Roll_No: { type: String, required: true },
        Total_Score_in_Science: { type: String, required: true },
    },
    { collection: "userData" }
);
var modelSci = new mongoose.model("Science", userDetail2, "userData");
///////////
var userDetail3 = new mongoose.Schema(
    {
        Name: { type: String, required: true },
        Roll_No: { type: String, required: true },
        Total_Score_in_History: { type: String, required: true },
    },
    { collection: "userData" }
);
var modelHis = new mongoose.model("History", userDetail3,"userData");
//making schema for collection already exist in db
var userDetail1 = new mongoose.Schema(
    {
        Question: { type: [String], required: true },
    },
    { collection: "Questions" }
);
var model1 = new mongoose.model("Questions", userDetail1, );
////////////
module.exports = {
    modelSci: modelSci,
    modelHis: modelHis,
    modelGk: modelGk,
    model1: model1
}