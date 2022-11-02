const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		content: {
			type: String
		},
		generalRating: {
			type: Number,
            required: true
		},
        startingPosition: {
            type: String,
		enum: ['Intern', 'Junior', 'Senior', 'Manager']
        },
        startingSalary: {
            type: Number
        },
		comments: [],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Company'
		},
	},
)

module.exports = mongoose.model('Review', reviewSchema)
