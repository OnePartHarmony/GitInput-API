const express = require('express')
const Company = require('../models/company')
const Review = require('../models/review')

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
const customErrors = require('../../lib/custom_errors')
const requireOwnership = customErrors.requireOwnership
const handle404 = customErrors.handle404


///////GET route to INDEX reviews by company//////
router.get('/reviews/:companyId', (req, res, next) => {
    const companyId = req.params.companyId
    Review.find({company: companyId}).sort({generalRating: -1})
        .then(reviews => {
            res.status(200).json({ reviews: reviews })     
        })
        .catch(next)
})

////POST route to CREATE review//////////
router.post("/reviews", requireToken, (req,res,next) => {
    Review.create(req.body.review)
        .then(res.sendStatus(204))
        .catch(next)
})

router.get('/reviews/show/:id', (req, res, next) => {
	Review.findById(req.params.id)
        .populate("owner")
        .populate("comments.author")
        .populate("company")
		.then(handle404)
		.then((review) => res.status(200).json({ review: review}))
		.catch(next)
})

// Update
router.patch('/reviews/:revId', requireToken, (req, res, next) => {
    delete req.body.review.owner
    delete req.body.review.comments

    Review.findById(req.params.revId)
    .then(handle404)
    .then(review => {
        requireOwnership(req, review)
        return review.updateOne(req.body.review)
    })
    .then(() => res.sendStatus(204))
    .catch(next)

})

router.delete('/reviews/:reviewId', requireToken, (req,res,next) => {
    Review.findById(req.params.reviewId)
        .then(handle404)
        .then(review => {
            requireOwnership(req, review)
            review.deleteOne()
            res.sendStatus(204)
        })
        .catch(next)
})


module.exports = router
