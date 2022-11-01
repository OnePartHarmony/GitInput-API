// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Companies = require('../models/company')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET 
router.get('/companies', (req, res, next) => {
	Companies.find()
		.then((companies) => {
			return companies.map((company) => company.toObject())
		})
		.then((companies) => res.status(200).json({ companies }))
		.catch(next)
})

//SEARCH
// GET 
// router.get('/companies', requireToken, (req, res, next) => {

// 	Companies.find()
// 	.then((companies) => {
// 	})
// })

// SHOW
// GET 
router.get('/companies/:id', (req, res, next) => {
	Companies.findById(req.params.id)
		.then(handle404)
		.then((company) => res.status(200).json({ company: company.toObject() }))
		.catch(next)
})

// CREATE
// POST 
router.post('/companies', requireToken, (req, res, next) => {
	req.body.company.owner = req.user.id

	Companies.create(req.body.compnay)
		.then((company) => {
			res.status(201).json({ company: company.toObject() })
		})

		.catch(next)
})

// UPDATE
// PATCH 
router.patch('/companies/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.company.owner

	Companies.findById(req.params.id)
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
	Companies.findById(req.params.id)
		.then(handle404)
		.then((company) => {
			requireOwnership(req, company)
			company.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router