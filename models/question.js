const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;