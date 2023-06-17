const knex = require("../database/index.js")
const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError.js")

class UserController {
  async create(request, response) {
    const {name, email, password} = request.body
    const hashedPassword = await hash(password, 8)
    const checkIfEmailExists = await knex("users").where({email})

    if(checkIfEmailExists.length > 0) {
      throw new AppError("Email já cadastrado!")
    }

    if(!name) {
      throw new AppError("Nome é obrigatório!")
    }
    
    await knex("users")
    .insert({
      name,
      email,
      password: hashedPassword
    })

    return response.status(201).json()
  }
}

module.exports = UserController