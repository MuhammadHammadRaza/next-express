const { postCreateTeamSchema, getTeamSchema, putMemberSchema, putQuestionSchema } = require("../validators/team")

const User = require("../models/user")
const Team = require("../models/team")
const { checkStatus } = require("../helper/checkStatus")
const Question = require("../models/question")

exports.postCreateTeam = async (req, res, next) => {
    try {
        const value = await postCreateTeamSchema.validateAsync(req.body)
        // using middleware, check if admin is valid and authenticated?
        let validateUsers = [req.userId]
        if (value.members) {
            validateUsers = [req.userId, ...value.members]
        }
        const validUsers = await User.find({
            '_id': {
                $in: [...validateUsers]
            }
        })
        if (validUsers.length !== validateUsers.length) {
            // console.log(validUsers.length);
            // console.log(value.members);
            console.log("Error response at teamController/postCreateTeam\nInvalid user id as member");
            return res.status(400).json({
                status: false,
                message: `Invalid member ID(s)`
            })
        }
        req.data = value
        next()
    } catch (error) {
        console.log("error at catch at teamController/postCreateTeam\n", error.message);
        console.log("Error: ", error);
        return res.status(500).json({
            status: false,
            message: `Something went wrong`
        })
    }
}

exports.getTeam = async (req, res, next) => {
    try {
        const value = await getTeamSchema.validateAsync(req.params)
        const userStatus = await checkStatus(req.userId, value.teamId)
        // console.log(userStatus);
        if (!userStatus) {
            console.log("error response at services/team/getTeam\nUnauthorized Request");
            return res.status(401).json({
                status: false,
                message: `Unauthorized request`
            })
        }
        req.data = value;
        req.data.userStatus = userStatus
        next()
    } catch (error) {
        console.log("error at catch at controller/team/getTeam\n", error.message);
        console.log(error);
        return res.status(500).json({
            status: false,
            message: `Something went wrong`
        })
    }
}

exports.putQuestion = async (req, res, next) => {
    try {
        const value = await putQuestionSchema.validateAsync({ ...req.params, ...req.body })


        const questionsId = value.questions.map(question => question.questionId)
        const isQuestionsValid = await Question.find({ '_id': { $in: [questionsId] } })
        if (questionsId.length !== isQuestionsValid.length) {
            console.log("error response at services/team/putQuestion\nInvalid question id");
            return res.status(400).json({
                status: false,
                message: `Invalid question Id(s)`
            })
        }
        const isInvalidTeam = isQuestionsValid.some(question => question._id !== isQuestionsValid[0]._id)
        if (isInvalidTeam) {
            console.log("error response at services/team/putQuestion\nMultiple team ids");
            return res.status(400).json({
                status: false,
                message: `Invalid team Id`
            })
        }
        const userStatus = await checkStatus(req.userId, isQuestionsValid[0]._id)
        if (userStatus !== admin) {
            console.log("error Response at controller/team/putMember\nUnauthorised request");
            return res.status(401).json({
                status: false,
                message: `Unauthorised request`
            })
        }
        return res.json(questionsId)

    } catch (error) {
        console.log("error response at services/team/putQuestion\n", error.message);
        console.log(error);
        return res.status(400).json({
            status: false,
            message: `Invalid question Id(s)`
        })
    }
}

// exports.putMember = async (req, res, next) => {
//     try {
//         const value = await putMemberSchema.validateAsync(req.params)
//         const userStatus = await checkStatus(req.userId, value.teamId)
//         if (userStatus !== admin) {
//             console.log("error Response at controller/team/putMember\nUnauthorised request");
//             return res.status(401).json({
//                 status: false,
//                 message: `Unauthorised request`
//             })
//         }
//         const isTeamValid = await Team.findById(value.teamId)
//         if (!isTeamValid) {
//             console.log("error Response at controller/team/putMember\nInvalid Team Id");
//             return res.status(400).json({
//                 status: false,
//                 message: `Invalid user/team id`
//             })
//         }
//         const isUserValid = await User.findById(value.userId)
//         if (!isUserValid) {
//             console.log("error Response at controller/team/putMember\nInvalid User Id");
//             return res.status(400).json({
//                 status: false,
//                 message: `Invalid user/team id`
//             })
//         }
//         // const isAdmin = await checkStatus("user ID", value.id)
//         // if (isAdmin != "admin") {
//         //     console.log("error response at services/team/getTeam\nUnauthorized Request");
//         //     return res.status(401).json({
//         //         status: false,
//         //         message: `Unauthorized request`
//         //     })
//         // }
//         req.data = value
//         next()
//         // res.json(req.params)
//     } catch (error) {
//         console.log("error at catch at controller/team/putMember\n", error.message);
//         return res.status(500).json({
//             status: false,
//             message: `Something went wrong`
//         })
//     }
// }