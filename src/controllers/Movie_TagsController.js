const knex = require("../database/index.js")
const AppError = require("../utils/AppError.js")

class Movie_TagsController {
  async index(request, response) {
    const tags = await knex("movie_tags")
    const nameTags = tags.map(tag => {
      return(tag.name)
    })

    response.json(nameTags)
  }
}

module.exports = Movie_TagsController