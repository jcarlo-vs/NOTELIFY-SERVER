// IMPORTS
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// extra security package
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// routes import
const authRouter = require('./routes/authRouter')
const noteRouter = require('./routes/noteRouter')

// middlewares
const connectDB = require('./db/connectDB')
const authentication = require('./middleware/authentication')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

app.set('trust proxy', 1)
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 100,
	})
)
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())

app.get('/', (req, res) => {
	res.send(' APP API')
})

// ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/notes', authentication, noteRouter)

// error catch
app.use(notFound)
app.use(errorHandlerMiddleware)

// ------------- PORT CONNECTION -------------
const PORT = process.env.PORT || 3000
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(PORT, console.log(`Server is listening to PORT ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}

start()
