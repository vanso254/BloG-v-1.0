const express=require('express')
const methodOverride=require('method-override')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const articleRouter=require('./Server/routes/articles')
const Article=require('./Server/models/article') 
const User=require('./Server/models/user')
const userRouter=require('./Server/routes/users')
const dashboardRouter=require('./Server/routes/dashboard')
const mongoose=require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const initializePassport = require('./Server/services/passport-config')
initializePassport(
    passport,
    email => User.find(user => user.email === email),
  id => User.find(user => user.id === id)
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

app.get('/news',(req,res)=>{
    res.render('articles/news/news.ejs')
})

//register route
app.post('/register',async(req,res,next)=>{
    req.user=new User()
    next()
},saveUserAndRedirect())

//login route
app.post('/login',checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.use('/articles',articleRouter)
app.use('/users',userRouter)
app.use('/dashboard',dashboardRouter)

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
            res.redirect('/login')
        } catch (e) {
           res.render('/register') 
           console.log(e)
        }
    }
}
//preventing the user from going back to the login page after logging in.
function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}
// preventing the user from going back to the login page after logging in.
function checkNotAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return response.redirect('/')
    }
    return next()
}

app.listen(4040)