const Joi = require("joi")

exports.postCreateTeamSchema = Joi.object({
    teamName: Joi.string().max(30).required(),
    // admin: Joi.string().hex().length(24).required(),
    members: Joi.array().items(Joi.string().hex().length(24))
})

exports.getTeamSchema = Joi.object({
    teamId: Joi.string().hex().length(24)
})

exports.putQuestionSchema = Joi.object({
    questions: Joi.array().items(
        Joi.object({
            questionId: Joi.string().hex().length(24).required(),
            value: Joi.string().max(500).required()
        })
    ).min(1).max(3).required()
})

exports.putMemberSchema = Joi.object({
    teamId: Joi.string().hex().length(24),
    userId: Joi.string().hex().length(24),
})
