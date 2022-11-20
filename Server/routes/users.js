const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const user = require('../models/user')
const User = require('../models/user')
const { Router, response } = require('express')
const article = require('../models/article')
const router = express.Router()


router.get('/register', (req, res) => {
    res.render('users/register')
})
router.get('/login', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.')
                return res.redirect('/login')
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true
                        req.session.user = user
                        return req.session.save(err => {
                            console.log(err)
                            res.redirect('/')
                        })
                    }
                    req.flash('error', 'Invalid email or password.')
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err)
                    res.redirect('/login')
                })
        })

    res.render('users/login')
})
router.get('/testuser', async(req, res) => {
    const users = await User.find().sort({
        id: 'asc'
    })
    res.render('users/usertesting', { users: users })
})

module.exports = router