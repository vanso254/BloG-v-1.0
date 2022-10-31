const mongoose=require('mongoose')
const slugify=require('slugify')
const marked=require('marked')

const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    link:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
})
articleSchema.pre('validate',function(next){
    if (this.title){
        this.slug=slugify(this.title,{lower:true,
        strict:true})
    }
    next()
})

module.exports =mongoose.model('Article',articleSchema) 