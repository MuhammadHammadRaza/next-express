const Team = require("../models/team")

exports.checkStatus = async (userId, teamId) => {
    try {


        const isAdmin = Team.find({ _id: teamId, admin: userId })
        if (isAdmin) {
            return "admin"
        }
        const isMember = Team.find({ _id: teamId, members: userId })
        if (isMember) {
            return "member"
        }
        return false
    } catch (error) {
        console.log("Error at helper checkStatus");
        return false
    }
}