const express = require("express")
const cors = require("express")
const morgan = require("morgan")
require("dotenv").config()
const resumeRouter = require("./routes/resumeRouter.js")

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./resumes"))

const PORT = process.env.PORT || 8080;

app.get("/", (req, res, next) => {
    res.send("Hello World")
})

app.use("/resume", resumeRouter)

// Error Handling
app.all('*', (req, res, next) => {
    res.status(404).send("Not found")
});

app.use((err, req, res, next) => {
    console.log(err.stack)
    if (!err.message) err.message = 'Something went wrong!';
    res.status(500).send(err.message)
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})