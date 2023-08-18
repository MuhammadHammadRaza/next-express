const User = require("../models/user")
const Team = require("../models/team")

exports.postSignup = async (req, res) => {
    try {
        const value = req.data
        // console.log(req.data);
        const _user = await User.findOne({ email: value.email }).exec()
        if (_user) {
            console.log("user: ", _user);
            console.log("error at services/auth/postSignup\n Email already registered");
            return res.status(400).json({
                status: false,
                message: `Email already registered`
            })
        }
        const user = new User(value)
        await user.save()
        const _admin = await Team.find({ 'admin': user._id }).select(["-admin"]).populate("members", "fullName")
        const _members = await Team.find({ 'members': [user._id] }).select(["-admin"]).populate("members", "fullName")
        const { _id, fullName, email } = user
        res.cookie("user", user._id, { signed: true, maxAge: 1000 * 60 * 60 * 24 })
        return res.json({
            status: true,
            message: "user created successfully",
            data: { _id, fullName, email, admin: _admin, members: _members }
        })
    } catch (error) {
        console.log("error at catch at authServices/postSignup\n", error);
        return res.status(500).json({
            status: false,
            message: `Something went wrong`
        })
    }
}

exports.postLogin = async (req, res) => {
    try {
        const value = req.body
        const user = await User.findOne({ email: value.email }).exec()
        console.log("user: ", user);
        if (!user) {
            console.log("error at authServices/postLogin\n Email not registered");
            return res.status(400).json({
                status: false,
                message: `Invalid credintials`
            })
        }

        // update this after adding bycrypt 
        if (user.password != value.password) {
            console.log("error at authServices/postLogin\n Incorrect password");
            return res.status(400).json({
                status: false,
                message: `Invalid credintials`
            })
        }
        const _admin = await Team.find({ 'admin': user._id }).select(["-admin"]).populate("members", "fullName")
        const _members = await Team.find({ 'members': [user._id] }).select(["-admin"]).populate("members", "fullName")
        const { _id, fullName, email } = user
        // res.cookie("user", user._id, { maxAge: 1000 * 60 * 60 * 24 })
        res.setHeader("Set-Cookie", `user=${user._id}`)
        return res.json({
            status: true,
            message: `User loggedIn successfully`,
            data: { _id, fullName, email, admin: _admin, members: _members }
        })
    } catch (error) {
        console.log("error at authServices/postLogin\n", error);
        return res.status(400).json({
            status: false,
            message: `Something went wrong`
        })
    }
}