const express = require('express')
const passport = require('passport')

const Review = require('../models/review')

const customErrors = require('../../lib/custom_errors')
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

const Comment = require("../models/comment")
// const comment = require('../models/comment')


// POST
router.post("/:companyId", (req, res) => {
    const companyId = req.params.companyId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    Product.findById(companyId)
        .then(company => {
            company.comments.push(req.body)
            return company.save()
        })
        .then(company => {
            res.redirect(`/companies/${company.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// Update
router.patch('/companies/:id', requireToken, removeBlanks, (req, res, next) => {
    delete req.body.comment.owner

    Comment.findById(req.params.id)
    .then(handle404)
    .then(comment => {
        return comment.updateOne(req.body.comment)
    })
    .then(() => res.sendStatus(204))
    .catch(next)

})

// DELETE
router.delete('/delete/:companyId/:commId', (req, res) => {
    const companyId = req.params.companyId 
    const commId = req.params.commId
    Product.findById(companyId)
        .then(company => {
            const theComment = company.comments.id(commId)
            console.log('this is the comment that was found', theComment)
            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    company.save()
                    res.redirect(`/companies/${company.id}`)
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))

})


module.exports = router