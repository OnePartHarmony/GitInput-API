const express = require('express')
const Company = require('../models/company')
const Review = require('../models/review')

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404


///////GET route to INDEX reviews by company//////
router.get('/reviews/:companyId', (req, res, next) => {
    const companyId = req.params.companyId
    Review.find({company: companyId})
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


// all users can post reviews
// router.post("reviews/:companyId", (req, res) => {
//     const companyId = req.params.companyId

//     Company.findById(companyId)
//         .then(company => {
//             // push the review into the company.reviews array
//             company.comments.push(req.body)
//             // we need to save the company
//             // averageRating()
//             return company.save()
//         })
//         .then(company => {
//             res.redirect(`/companies/${company.id}`)
//         })
//         //  --> send some kind of error depending on what went wrong
//         .catch(err => res.redirect(`/error?error=${err}`))
// })



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