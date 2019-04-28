const mongoose = require("mongoose");
////////
var userDetail = new mongoose.Schema(
    {
        Name: { type: String, required: true },
        Roll_No: { type: String, required: true },
        Total_Score_in_GK: { type: String, default: false },
        Total_Score_in_Science: { type: String, default: false },
        Total_Score_in_History: { type: String, default: false },
    },
    { collection: "userData" }
);
var model = new mongoose.model("G-K,Sci,His", userDetail,"userData");
//////////
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
    model: model,
    model1: model1
}