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

  async update(request, response) {
    const { name, email, password, oldPassword } = request.body
    const { id } = request.params
    const [user] = await knex("users").where({id})
    let newPassword

    if (password) {
      if (!oldPassword) {
        throw new AppError("É necessário informar a senha antiga.")
      }
    }

    if (oldPassword) {
      if (!password) {
        throw new AppError("É necessário informar a nova senha")
      }
    }

    if (password && oldPassword) {
      const verifyPassword = await compare(oldPassword, user.password)

      if(!verifyPassword) {
        throw new AppError('Senha anterior está incorreta!')
      }

      newPassword = await hash(password, 8)
    }

    await knex("users").where({id}).update({name, email, password: newPassword, updated_at: knex.fn.now()})

    return response.json()
  }
}

module.exports = UserController