
// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Company = require('../models/company')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { company: { title: '', text: 'foo' } } -> { company: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()

// INDEX
// GET /companies
router.get('/companies', (req, res, next) => {
	Company.find()
		.then((companies) => {
			res.status(200).json({ companies: companies })
		})
		.catch(next)
})

//SEARCH
// GET /companies
router.get('/companies', requireToken, (req, res, next) => {

	Company.find(/*placeholder*/)
	.then((companies) => {
	})
})

// SHOW
// GET /companies/5a7db6c74d55bc51bdf39793
router.get('/companies/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Company.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "company" JSON
		.then((company) => res.status(200).json({ company: company }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /companies
router.post('/companies', requireToken, (req, res, next) => {
	// set owner of new company to be current user
	req.body.company.owner = req.user.id

	Company.create(req.body.compnay)
		// respond to succesful `create` with status 201 and JSON of new "company"
		.then((company) => {
			res.status(201).json({ company: company})
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /companies/5a7db6c74d55bc51bdf39793
router.patch('/companies/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.company.owner

	Company.findById(req.params.id)
		.then(handle404)
		.then((company) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, company)

			// pass the result of Mongoose's `.update` to the next `.then`
			return company.updateOne(req.body.company)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /companies/5a7db6c74d55bc51bdf39793
router.delete('/companies/:id', requireToken, (req, res, next) => {
	Company.findById(req.params.id)
		.then(handle404)
		.then((company) => {
			// throw an error if current user doesn't own `company`
			requireOwnership(req, company)
			// delete the company ONLY IF the above didn't throw
			company.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
