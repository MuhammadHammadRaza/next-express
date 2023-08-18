const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("db connected");
    })
    .catch((error) => {
        console.log("error connecting db");
        console.log("Error: ", error)
    })

module.exports = { mongoose }