const mongoose=require('mongoose')

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
        required:false
    },
    description:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true
    }

})
module.exports =mongoose.model('Article',articleSchema) 