const express=require('express')
const bcrypt=require('bcrypt')
const passport = require('passport')
const user=require('../models/user')
const User=require('../models/user')
const { Router, response } = require('express')
const article = require('../models/article')
const initializePassport = require('../services/passport-config')
const router=express.Router()

initializePassport(
    passport, email => User.find(user => user.email === email),
    id => User.find(user => user.id === id)
)


router.get('/register',(req,res)=>{
    res.render('users/register')
})
router.get('/login',(req,res)=>{
    res.render('users/login')
})
router.get('/testuser',async(req,res)=>{
    const users=await User.find().sort({
        id:'asc'
    })
    res.render('users/usertesting',{users:users})
})

router.post('/',async(req,res,next)=>{
    req.user=new User()
    next()
},saveUserAndRedirect())

router.post('/login',checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

function saveUserAndRedirect(){
    return async (req, res)=>{
            let user=req.user
            user.name=req.body.name
            user.email=req.body.email
            user.phone=req.body.phone
            user.gender=req.body.gender
            user.password=await bcrypt.hash(req.body.password, 10)
        
        try {
            user=await user.save()
            res.redirect('/users/login')
        } catch (e) {
           res.render('users/register') 
           console.log(e)
        }
    }
}
//protecting our routes for when we are not logged in. We will use a middleware
function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login')
}
// preventing the user from going back to the login page after logging in.
function checkNotAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return response.redirect('/')
    }
    return next()
}

module.exports=router