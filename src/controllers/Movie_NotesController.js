const knex = require("../database/index.js")
const AppError = require("../utils/AppError.js")

class Movie_NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params
    const verifyRating = rating >= 0

    if(!verifyRating) {
      throw new AppError("Deve ser informado um número entre 0 e 5!")
    }

    if(rating > 5) {
      throw new AppError("O número informado é superior a nota máxima (5).")
    }

    if(!title) {
      throw new AppError("O título do filme deve ser informado.")
    }

    const [movie_id] = await knex("movie_notes").insert({title, description, rating, user_id})

    const tagsInsert = tags.map(name => {
      return {
        movie_id,
        user_id,
        name
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    return response.json()
  }

  async delete(request, response) {
    const {title} = request.query

    await knex("movie_notes").whereLike("title", `%${title}%`).del()

    return response.json()
  }

  async index(request, response) {
    const [movieNotes] = await knex("movie_notes")
    const movieTags = await knex("movie_tags").where("movie_id", movieNotes.id)
    const tags = movieTags.map(tag => {
      return(tag.name)
    })

    const data = {
      movieId: movieNotes.id, 
      movieTitle: movieNotes.title,
      movieDescription: movieNotes.description,
      movieRating: movieNotes.rating,
      movieTags: tags}

    return response.json(data)
  }

  async show(request, response) {
    const { title } = request.params
    const [movieNotes] = await knex("movie_notes").whereLike("title", `%${title}%`)
    const movieTags = await knex("movie_tags").where("movie_id", movieNotes.id)
    const tags = movieTags.map(tag => {
      return(tag.name)
    })

    const data = {
      movieId: movieNotes.id, 
      movieTitle: movieNotes.title,
      movieDescription: movieNotes.description,
      movieRating: movieNotes.rating,
      movieTags: tags}

    return response.json(data)
  }
}

module.exports = Movie_NotesController