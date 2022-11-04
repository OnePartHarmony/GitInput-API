'use strict'

const mongooseBaseName = 'git-input'

const database = {
	development: `mongodb://localhost/${mongooseBaseName}-development`,
	test: `mongodb://localhost/${mongooseBaseName}-test`,
}

const localDb = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.MONGODB_URI || localDb

module.exports = currentDb
