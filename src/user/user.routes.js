'use strict'

import { Router } from "express"
import { login, save, update, updatePassword } from "./user.controller.js"
import { isUser, validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/register', save)
api.post('/login', login)
api.put('/update/:id', [validateJwt, isUser], update)
api.post('/updatePass/:id', [validateJwt], updatePassword)

export default api