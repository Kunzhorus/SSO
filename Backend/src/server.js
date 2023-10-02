import express from 'express'
import configViewEngine from './config/viewEngine'
import initApiRoutes from './routes/api'
import configCors from './config/cors'
import { connection } from './config/connectDB'
import cookieParser from 'cookie-parser'

const  bodyParser = require('body-parser')
const app = express()
const port = 8080
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

connection()
configViewEngine(app) 
configCors(app)
initApiRoutes(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
}) 