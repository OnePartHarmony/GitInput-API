const express = require('express')
const passport = require('passport')

const Review = require('../models/review')

const customErrors = require('../../lib/custom_errors')
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()



module.exports = router