import express from 'express'
import configViewEngine from './config/viewEngine'
import initApiRoutes from './routes/api'
import initWebRoutes from './routes/web'
import configCors from './config/cors'
import { connection } from './config/connectDB'
import cookieParser from 'cookie-parser'
import { configPassport } from './controllers/passportController'
import configSession from './config/session'
import ConfigLoginWithGoogle from './controllers/Social/GoogleController'
import ConfigLoginWithFacebook from './controllers/Social/FacebookController'
import flash from 'connect-flash'

const bodyParser = require('body-parser')
const app = express()
const port = 8080
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
configSession(app)
connection()
configViewEngine(app) 
configCors(app)
initApiRoutes(app)
initWebRoutes(app)
configPassport()
ConfigLoginWithGoogle()
ConfigLoginWithFacebook()

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
}) 