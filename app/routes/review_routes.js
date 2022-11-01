const express = require('express')
const Company = require('../models/company')

const router = express.Router()

// all users can post reviews
router.post("/:companyId", (req, res) => {
    const companyId = req.params.companiesId

    Company.findById(companyId)
        .then(company => {
            company.comments.push(req.body)
            return company.save()
        })
        .then(company => {
            res.redirect(`/companies/${company.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
router.delete('/delete/:companyId/:revId', (req, res) => {

    const companyId = req.params.companyId 
    const revId = req.params.revId
    Company.findById(companyId)
        .then(company => {
            const theReview = company.reviews.id(revId)
            console.log('this is the review that was found', theReview)
            if (req.session.loggedIn) {
                if (theReview.author == req.session.userId) {
                    theReview.remove()
                    company.save()
                    res.redirect(`/companies/${company.id}`)
                    return company.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))

})


module.exports = router