// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')


const Company = require('../models/company')


const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()

// INDEX
// GET /companies
router.get('/companies', (req, res, next) => {
	Company.find().sort({name: 1}).limit(10000)
		.then((companies) => {
			res.status(200).json({ companies: companies })
		})
		.catch(next)
})

// SHOW
// GET 
router.get('/companies/:id', (req, res, next) => {
	Company.findById(req.params.id)
		.then(handle404)
		.then((company) => res.status(200).json({ company: company }))

		.catch(next)
})

// CREATE
// POST 
router.post('/companies', requireToken, (req, res, next) => {
	req.body.company.owner = req.user.id

	Company.create(req.body.company)
		.then((company) => {
			res.status(201).json({ company: company })
		})

		.catch(next)
})

// //SEARCH
// // POST
// router.post('/companies/search', requireToken, async (req, res, next) => {
// 	//create query string, this is what you pass to the route
// 	const queryString = req.body.queryString
// 	//split query string into pieces, getting rid of spaces
// 	const queryStrings = queryString.split(" ")
// 	//make all query pieces into an array
// 	allQueries = []
// 	//run a for-each loop which searches each individual piece of the array
// 	//the search returns anything that *contains* the element
// 	queryStrings.forEach(element => {
// 		allQueries.push({name: {$regex : String(element)}})
// 	})
// 	const allCompanies = await Company.find({$or : allQueries})
// 	//errors and the 'return' section of the route
// 	if (!allCompanies || allCompanies.length === 0) res.status(400).send({error : "No company found"})
// 	res.status(200).send(allCompanies)
// })

// UPDATE
// PATCH 
router.patch('/companies/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.company.owner

	Company.findById(req.params.id)
		.then(handle404)
		.then((company) => {
			requireOwnership(req, company)

			return company.updateOne(req.body.company)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE 
router.delete('/companies/:id', requireToken, (req, res, next) => {
	Company.findById(req.params.id)
		.then(handle404)
		.then((company) => {
			requireOwnership(req, company)
			company.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
