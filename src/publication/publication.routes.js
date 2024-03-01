'use strict'

import { Router } from "express"

import { deleteP, getPublications, getPublicationsWithID, save, update } from "./publication.controller.js"
import { isAdmin, isUser, validateJwt } from '../middlewares/validate-jwt.js' 

const api = Router()

api.post('/create', save)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteP)
api.get('/get', [validateJwt, isAdmin], getPublications)
api.post('/searchMyPublication/:id', [validateJwt, isUser], getPublicationsWithID)

export default api
