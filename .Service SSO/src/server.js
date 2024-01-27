import express from 'express'
import configViewEngine from './config/viewEngine'
import userAPI from './routes/userAPI'
import ssoAPI from './routes/ssoAPI'
import configCors from './config/cors'
import { connection } from './config/connectDB'
import cookieParser from 'cookie-parser'
import configSession from './config/session'
import flash from 'connect-flash'
import { ConfigLocalStrategy, ConfigFacebookStrategy, ConfigGoogleStrategy } from './config/passportStrategy'

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
userAPI(app)
ssoAPI(app)
ConfigLocalStrategy()
ConfigFacebookStrategy()
ConfigGoogleStrategy()

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
}) 