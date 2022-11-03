const express=require('express')
const bcrypt=require('bcrypt')
const user=require('../models/user')
const User=require('../models/user')
const { Router, response } = require('express')
const article = require('../models/article')
const router=express.Router()


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
router.post('/login',(req,res)=>{

})
function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login')
}

function checkNotAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return response.redirect('/')
    }
    return next()
}

module.exports=router