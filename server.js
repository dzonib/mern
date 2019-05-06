const express = require("express")

const sequelize = require('./config/db')

const app = express()

app.use(express.json({extended: false}))

app.get("/", (req, res) => res.send("yo"))

// define routes
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/posts", require("./routes/api/posts"))

const port = process.env.PORT || 5000

sequelize
    .sync()
    .then(() =>
        app.listen(port, () =>
            console.log(`Server running on http://localhost:${port}`)
        )
    )
