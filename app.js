const express = require('express')
const env = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require('cors')

const app = express()
const port = 3000
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

env.config()
app.use(cors(corsOptions))

const { mongoose } = require("./config/db")

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))

const authRoutes = require("./routes/auth")
const teamRoutes = require("./routes/team")
const { isAuthenticated } = require('./middlewares/isAuthenticated')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test',
  // isAuthenticated,
  (req, res) => {
    console.log("/test");
    res.json("successful")
  })

app.use("/auth", authRoutes)
app.use("/team", teamRoutes)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})