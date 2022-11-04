const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
		comment: {
			type: String,
			required: true,
		},
		owner: {
            type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = commentSchema