const express=require('express')
const methodOverride=require('method-override')
const articleRouter=require('./Server/routes/articles')
const Article=require('./Server/models/article') 
const User=require('./Server/models/user')
const userRouter=require('./Server/routes/users')
const mongoose=require('mongoose')


const app = express()

mongoose.connect('mongodb://localhost',{
    useNewUrlParser: true, useUnifiedTopology: true
})
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.get('/',async(req,res)=>{
    const articles=await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)
app.use('/users',userRouter)

app.listen(4040)