
// Import Dependencies
const express = require('express')
const Company = require('../models/company')
const Review = require('../models/review')

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// Create router
const router = express.Router()

///////GET route to INDEX reviews by company//////
router.get('/reviews/:companyId', (req, res, next) => {
    const companyId = req.params.companyId
    console.log(companyId)
    Review.find({company: companyId})
        .then(reviews => {
            res.status(200).json({ reviews: reviews })
        })
        .catch(next)
})

////POST route to CREATE review//////////
router.post("/reviews", requireToken, (req,res,next) => {
    Review.create(req.body.review)
        .then(res.sendStatus(201))
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
// only the author of the review can delete it
router.delete('/delete/:companyId/:revId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const companyId = req.params.companyId 
    const revId = req.params.revId
    // get the company
    Company.findById(companyId)
        .then(company => {
            // get the review
            // this built in method is called .id()
            const theReview = company.reviews.id(revId)
            console.log('this is the review that was found', theReview)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the review delete it
                if (theReview.author == req.session.userId) {
                    theReview.remove()
                    company.save()
                    res.redirect(`/companies/${company.id}`)
                    // return the saved company
                    return company.save()
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////



module.exports = router
