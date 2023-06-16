const knex = require("../database/index.js")
const { hash, compare } = require("bcryptjs")

class UserController {
  async create(request, response) {
    const {name, email, password} = request.body
    const hashedPassword = await hash(password, 8)
    
    await knex("users")
    .insert({
      name,
      email,
      password: hashedPassword
    })

    return response.json()
  }
}

module.exports = UserController