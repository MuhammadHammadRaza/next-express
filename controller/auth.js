const { postSignupSchema, postLoginSchema } = require("../validators/auth")

exports.postSignup = async (req, res, next) => {
    try {
        const value = await postSignupSchema.validateAsync(req.body);

        const userCookie = req.signedCookies.user
        if (userCookie) {
            console.log("error at authController/postSignup\n Auth cookie already exist");
            return res.status(400).json({
                status: false,
                message: `Invalid request`
            })
        }

        value.email = value.email.toLowerCase()
        delete value.confirmPassword

        
        req.data = value
        next()
    } catch (error) {
        console.log("error at catch at authController/postSignup\n", error.message);
        return res.status(500).json({
            status: false,
            message: `Something went wrong`
        })
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        console.log("user at authController/postLogin\n", req.body);
        const value = await postLoginSchema.validateAsync(req.body);
        const userCookie = req.signedCookies.user
        if (userCookie) {
            console.log("error at authController/postLogin\n Auth cookie already exist");
            return res.status(400).json({
                status: false,
                message: `Invalid request`
            })
        }
        value.email = value.email.toLowerCase()
        req.data = value
        next()
    } catch (error) {
        console.log("error at catch at authController/postLogin\n", error.message);
        return res.status(500).json({
            status: false,
            message: `Something went wrong`
        })
    }
}