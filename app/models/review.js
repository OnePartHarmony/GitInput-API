const mongoose = require('mongoose')
const user = require('./user')

const reviewSchema = new mongoose.Schema(
    {
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
        generalRating: {
			type: Number,
			required: true,
		},
        author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
        startingPosition: {
			type: String,
			required: true,
		},
        startingSalary: {
			type: Number,
			required: true,
		},
	},
)

module.exports = mongoose.model('Review', reviewSchema)