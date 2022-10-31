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
	},
)

module.exports = mongoose.model('Company', companySchema)
