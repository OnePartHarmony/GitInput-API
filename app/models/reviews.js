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
		genRating: {
			type: Number,
            required: true,
		},
        startPosition: {
            type: String,
        },
        salaryStart: {
            type: Number,
        },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
)

module.exports = mongoose.model('Reviews', reviewSchema)