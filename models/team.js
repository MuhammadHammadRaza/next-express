const mongoose = require("mongoose")
const { Schema } = mongoose;

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;