const express=require('express')
const router=express.Router()

router.get('/basic',(req,res)=>{
res.render('dashboard/basic.ejs')
})

router.get('/editor',(req,res)=>{

})


router.get('/admin',(req,res)=>{

})


module.exports =router