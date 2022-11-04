const express = require('express')
const passport = require('passport')

const Review = require('../models/review')

const customErrors = require('../../lib/custom_errors')
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const handle404 = customErrors.handle404

const router = express.Router()



// POST
router.post("/comments/:reviewId", requireToken, (req,res,next) => {
    const reviewId = req.params.reviewId
    Review.findById(reviewId)
        .then(review => {
            review.comments.push(req.body)
            return review.save()
        })
        .then(res.sendStatus(204))
        .catch(next)
})

// Update
router.patch('/comments/:reviewId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    delete req.body.comment.owner

    Review.findById(req.params.reviewId)
        .then(handle404)
        .then(review => {
            const theComment = review.comments.id(req.params.commentId)
            requireOwnership(req, theComment)
            theComment.comment = req.body.comment
            review.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)

})


router.delete('/delete/:reviewId/:commentId', requireToken, (req, res, next) => {
    const reviewId = req.params.reviewId 
    const commentId = req.params.commentId
    Review.findById(reviewId)
        .then(handle404)
        .then(review => {
            const theComment = review.comments.id(commentId)
            requireOwnership(req, theComment)
            theComment.remove()
            review.save()
            res.sendStatus(204)
        })
        .catch(next)
})


module.exports = router
