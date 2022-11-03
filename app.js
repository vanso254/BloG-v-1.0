const express=require('express')
const methodOverride=require('method-override')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const articleRouter=require('./Server/routes/articles')
const Article=require('./Server/models/article') 
const User=require('./Server/models/user')
const userRouter=require('./Server/routes/users')
const initializePassport = require('./Server/services/passport-config')
const mongoose=require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

initializePassport(
    passport, email => users.find(user => user.email === email),
    //46. We define Id by comparing ids in users
    id => users.find(user => user.id === id)
)

const app = express()

mongoose.connect('mongodb://localhost',{
    useNewUrlParser: true, useUnifiedTopology: true
})
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

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