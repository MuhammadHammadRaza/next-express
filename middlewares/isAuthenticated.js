exports.isAuthenticated = async (req, res, next) => {
    console.log("req.cookies: ", req.cookies);
    console.log("req.signedCookies: ", req.signedCookies);
    // const userCookie = req.signedCookies.user
    const userCookie = req.cookies.user
    if (userCookie) {
        req.userId = userCookie;
        return next();
    }
    return res.status(401).json({
        status: false,
        message: "Unauthorized request"
    })
}