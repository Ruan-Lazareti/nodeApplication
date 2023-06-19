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
}

module.exports = Movie_NotesController