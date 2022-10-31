const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
		},
		generalRating: {
			type: Number,
            required: true,
		},
        startingPosition: {
            type: String,
        },
        startingSalary: {
            type: Number,
        },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',

		},
	},
)

module.exports = mongoose.model('Review', reviewSchema)