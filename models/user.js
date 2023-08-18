const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    // admin: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Team",
    // }],
    // members: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Team",
    // }]
})

const User = mongoose.model("User", userSchema);

module.exports = User;