require("express-async-errors")
const express = require("express")
const app = express()
const port = '3333'
app.listen(port)
app.use(express.json())
