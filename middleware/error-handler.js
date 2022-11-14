const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || `Something went wrong, please try again later`,
	}
	if (err.name === 'ValidationError') {
		const newError = Object.values(err.errors).map((item) => item.message)
		customError.msg = newError.join(',')
	}

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please Choose another value`
		customError.statusCode = 400
	}

	if (err.name === 'CastError') {
		customError.msg = `No item found with id : ${err.value}`
		customError.statusCode = StatusCodes.NOT_FOUND
	}

	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })

	return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
