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
        //update average rating of reviewed company
            Company.findById(review.company)
                .then(company => {
                    let currentQuantity = company.numberOfReviews
                    if (currentQuantity && currentQuantity > 0) {
                        let currentSum = (currentQuantity * company.averageRating) + review.generalRating
                        company.numberOfReviews = currentQuantity + 1
                        company.averageRating = currentSum / company.numberOfReviews
                    } else {
                 //if no reviews, number is one, average is rating       
                        company.numberOfReviews = 1
                        company.averageRating = review.generalRating
                    }
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
    delete req.body.review.company

    Review.findById(req.params.reviewId)
        .then(handle404)
        .then(review => {
            requireOwnership(req, review)
        //update company rating in case review has new rating
            Company.findById(review.company)
                .then(company => {
                    let totalReviews = company.numberOfReviews
                    let minusOld = (totalReviews * company.averageRating) - review.generalRating
                    company.averageRating = (minusOld + req.body.review.generalRating) / totalReviews
                    company.save()
                })
                .catch(next)
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
        //remove review from count and average in company
            Company.findById(review.company)
                .then(company => {
                    let currentQuantity = company.numberOfReviews
                    let currentSum = (currentQuantity * company.averageRating) - review.generalRating
                    company.numberOfReviews = currentQuantity - 1
                    company.averageRating = currentSum / company.numberOfReviews
                    company.save()
                })
                .catch(next)
            review.deleteOne()
            res.sendStatus(204)
        })
        .catch(next)
})


module.exports = router
