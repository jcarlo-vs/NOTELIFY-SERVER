const User = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index-Error')

const register = async (req, res) => {
	const user = await User.create(req.body)
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password')
	}
	const user = await User.findOne({ email })
	console.log(user)
	if (!user) {
		throw new UnauthenticatedError('Invalid Email')
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError(`Email and Password doesn't match`)
	}

	// IF ALL CREDENTIALS are CORRECT
	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user: { name: user.name, id: user._id }, token })
}

module.exports = { register, login }
