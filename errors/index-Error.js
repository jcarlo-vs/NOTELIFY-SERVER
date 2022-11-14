const BadRequestError = require('./bad-request-Error')
const CustomAPIError = require('./custom-api-Error')
const NotFoundError = require('./not-found-Error')
const UnauthenticatedError = require('./unauthenticated-Error')

module.exports = { CustomAPIError, BadRequestError, NotFoundError, UnauthenticatedError }
