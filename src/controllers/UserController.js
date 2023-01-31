const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const brcrypt = require("bcryptjs")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body
    if (!name) {
      throw new AppError("Nome é Obrigatório!")
    }

    const userWithEmail = await knex("users").where({ email })

    if (userWithEmail.length > 0) {
      throw new AppError("Este email já está em uso!")
    }

    const hashedPassword = await brcrypt.hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    })
    return response.json()
  }
}

module.exports = UserController
