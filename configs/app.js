'use strict'

//Importaciones para módulos del servidor
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import { config } from "dotenv"
import cors from "cors"

//Configuraciones de puerto y app
const app = express()
config()
const port = process.env.PORT || 3056

//Importaciones de rutas de modelos "model.routes.js"
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'

//Configuración de seguridad de servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Declaración de rutas de modelos
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/publication', publicationRoutes)
app.use('/comment', commentRoutes)

//Levantamiento del servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP whit port: ${port} is running `)
}
