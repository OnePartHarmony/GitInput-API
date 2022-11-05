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
    Review.find({company: companyId})
        .populate("owner")
        .then(reviews => {
            reviews.sort((a,b) => b.userLikes.length - a.userLikes.length)
            res.status(200).json({ reviews: reviews })     
        })
        .catch(next)
})

////POST route to CREATE review//////////
router.post("/reviews", requireToken, (req,res,next) => {
    Review.create(req.body.review)
        .then(review => {
            Company.findById(review.company)
                .then(company => {
                    const totalReviews = company.numberOfReviews ? company.numberOfReviews + 1 : 1
                    company.numberOfReviews = totalReviews
                    company.save()
                })
                .catch(next)
        })
        .then(res.sendStatus(204))
        .catch(next)
})

//GET route to SHOW review
router.get('/reviews/show/:reviewId', (req, res, next) => {
	Review.findById(req.params.reviewId)
        .populate("owner")
        .populate("comments.owner")
        .populate("company")
		.then(handle404)
		.then((review) => res.status(200).json({ review: review}))
		.catch(next)
})

// PATCH route to UPDATE review
router.patch('/reviews/:reviewId', requireToken, (req, res, next) => {
    delete req.body.review.owner
    delete req.body.review.comments

    Review.findById(req.params.reviewId)
        .then(handle404)
        .then(review => {
            requireOwnership(req, review)
            return review.updateOne(req.body.review)
        })
        .then(() => res.sendStatus(204))
        .catch(next)

})

// PATCH route to LIKE review
router.patch('/reviews/like/:reviewId', requireToken, (req,res,next) => {
    Review.findById(req.params.reviewId)
        .then(handle404)
        .then(review => {
            ///save user id in array of users who have liked the review
            const userId = req.body.userId
            if (review.userLikes.includes(userId)) {
                return
            } else {
                review.userLikes.push(userId)
                review.save({timestamps: false}) 
            }
            
        })
        .finally(res.sendStatus(204))
        .catch(next)
})

// PATCH route to UNLIKE review
router.patch('/reviews/unlike/:reviewId', requireToken, (req,res,next) => {
    Review.findById(req.params.reviewId)
        .then(handle404)
        .then(review => {
            ///remove user id from array of users who have liked the review
            const userId = req.body.userId           
            const userIndex = review.userLikes.findIndex(id => id === userId)
            review.userLikes.splice(userIndex, 1)
            review.save({timestamps: false})
        })
        .finally(res.sendStatus(204))
        .catch(next)
})


// DELETE route to DESTROY review
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
