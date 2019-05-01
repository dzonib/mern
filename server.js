const express = require('express')

const app = express()

app.get('/', (req, res) => res.send("yo"))

const port = process.env.PORT || 5000


app.listen(port, () => console.log(`Server running on http://localhost:${port}`))