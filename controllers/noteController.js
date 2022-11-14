const Note = require('../models/NoteModel')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors/index-Error')

const getAllNotes = async (req, res) => {
	const users = await Note.find({ createdBy: req.user.userId }).sort('updatedAt')

	res.status(StatusCodes.OK).json({ users })
}

const createNote = async (req, res) => {
	req.body.createdBy = req.user.userId
	const note = await Note.create(req.body)

	res.status(StatusCodes.CREATED).json({ note })
}

const getSingleNote = async (req, res) => {
	const { id } = req.params
	const { userId } = req.user
	const note = await Note.findOne({ _id: id, createdBy: userId })
	if (!note) {
		throw new NotFoundError('No Note ID Found')
	}

	res.status(StatusCodes.OK).json({ note })
}

const updateNote = async (req, res) => {
	const {
		body: { title, content },
		params: { id },
		user: { userId },
	} = req

	const note = await Note.findOneAndUpdate({ _id: id, createdBy: userId }, req.body, {
		new: true,
		runValidators: true,
	})
	if (!note) {
		throw new BadRequestError('Title or Content fields cannot be empty')
	}

	res.status(StatusCodes.OK).json({ note })
}

const deleteNote = async (req, res) => {
	const {
		params: { id },
		user: { userId },
	} = req

	const note = await Note.findOneAndDelete({ _id: id, createdBy: userId })

	if (!note) {
		throw new NotFoundError('No note ID found')
	}

	res.status(StatusCodes.OK).json({ msg: 'delete successful' })
}

module.exports = { getAllNotes, createNote, getSingleNote, updateNote, deleteNote }
