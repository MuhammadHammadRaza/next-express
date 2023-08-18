const { checkStatus } = require("../helper/checkStatus");
const Question = require("../models/question");
const Team = require("../models/team")

exports.postCreateTeam = async (req, res) => {
    try {
        const value = req.data;
        value.admin = req.userId;
        const team = new Team(value)
        await team.save()
        const { _id, teamName, members } = team
        return res.json({
            status: true,
            message: "Team created successfully",
            data: { _id, teamName, members }
        })
    } catch (error) {
        console.log("error at catch at teamServices/postCreateTeam\n", error.message);
        return res.status(500).json({
            status: false,
            message: `Something went wrong`
        })
    }
}

const getAdminTeam = async (data) => {
    const _validTeam = await Team.findById(data.teamId)
        .select("-admin")
        .populate("members", ["fullName", "_id"])
    if (!_validTeam) {
        return false
    }
    // console.log(validTeam);
    const questions = await Question.find({ team: _validTeam._id, status: true }).select(["_id", "value"])
    // console.log("questions: ", questions);
    const validTeam = JSON.parse(JSON.stringify(_validTeam))
    return { ...validTeam, questions }
}

const getMemberTeam = async (data) => {
    console.log("getMemberTeam");
    const validTeam = await Team.findById(data.teamId)
    // .select(["-admin", "-members"])
    // .populate("members", ["fullName", "_id"])
    if (!validTeam) {
        return false
    }
    const questions = await Question.find({ team: validTeam._id, status: true }).exec()
    return validTeam;
}

exports.getTeam = async (req, res, next) => {
    try {
        const value = req.data
        let team;
        // const _question = new Question({
        //     value: "This is test question",
        //     team: value.teamId
        // })
        // await _question.save()
        value.userStatus === "admin" ? team = await getAdminTeam(value) : team = await getMemberTeam(value)
        if (!team) {
            console.log("error response at services/team/getTeam\nInvalid Team ID");
            return res.status(400).json({
                status: false,
                message: `Invalid team`
            })
        }
        delete team.__v
        // console.log(team);
        return res.json({
            status: true,
            message: `Team get successfully`,
            data: team
        })
    } catch (error) {
        console.log("error at catch at services/team/getTeam\n", error.message);
        console.log(error);
        return res.status(500).json({
            status: false,
            message: `Something went wrong`
        })
    }
}

exports.putMember = async (req, res, next) => {
    try {
        const value = req.data
        res.json("Incomplete response")
    } catch (error) {
        console.log("error at catch at services/team/putMember\n", error.message);
        return res.status(500).json({
            status: false,
            message: `Something went wrong`
        })
    }
}