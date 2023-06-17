const { Router } = require("express")
const movie_notesRoutes = Router()

const movie_notesController = require("../controllers/Movie_NotesController.js")
const movieNotesController = new movie_notesController()

movie_notesRoutes.post("/:user_id", movieNotesController.create)


module.exports = movie_notesRoutes