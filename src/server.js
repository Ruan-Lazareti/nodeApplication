require("express-async-errors")
const express = require("express")
const app = express()
const port = '3333'
const routes = require("./routes/index.js")
app.listen(port)
app.use(express.json())
app.use(routes)