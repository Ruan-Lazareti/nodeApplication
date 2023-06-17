require("express-async-errors")
const express = require("express")
const app = express()
const port = '3333'
const routes = require("./routes/index.js")
const AppError = require("./utils/AppError.js")
app.listen(port)
app.use(express.json())
app.use(routes)
app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})