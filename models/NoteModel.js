const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please provide title'],
			maxlength: 50,
		},
		content: {
			type: String,
			required: [true, 'Please provide content'],
			maxlength: 1000,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'Users',
			required: [true, 'please provide user'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Note', NoteSchema)
