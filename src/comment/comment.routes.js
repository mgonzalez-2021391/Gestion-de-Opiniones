'use strict'

import { Router } from "express"

import { deleteC, getCommentWhitID, getComments, save, update } from "./comment.controller.js"
import { isAdmin, isUser, validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/create', save)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteC)
api.get('/get', [validateJwt, isAdmin], getComments)
api.post('/getMyCommentaries/:id', [validateJwt, isUser], getCommentWhitID)

export default api