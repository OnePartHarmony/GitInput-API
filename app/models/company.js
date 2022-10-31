const mongoose = require('mongoose')

const companySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		logo: {
			type: Image,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
)

module.exports = mongoose.model('Companies', companySchema)
