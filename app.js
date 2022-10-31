const express=require('express')
const articleRouter=require('./routes/articles')
const Article=require('./models/article') 
const mongoose=require('mongoose')


const app = express()

mongoose.connect('mongodb://localhost',{
    useNewUrlParser: true, useUnifiedTopology: true
})
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.get('/',async(req,res)=>{
    const articles=await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)
app.listen(4040)