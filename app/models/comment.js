const mongoose = require('mongoose')
const user = require('./user')

const commentSchema = new mongoose.Schema(
    {
		note: {
			type: String,
			required: true,
		},
		author: {
            type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Comment', commentSchema)