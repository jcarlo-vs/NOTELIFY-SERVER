const express = require('express')
const { getAllNotes, createNote, updateNote, getSingleNote, deleteNote } = require('../controllers/noteController')
const router = express.Router()

router.route('/').get(getAllNotes).post(createNote)
router.route('/:id').get(getSingleNote).patch(updateNote).delete(deleteNote)

module.exports = router
