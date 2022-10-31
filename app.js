const express=require('express')
const articleRouter=require('./routes/articles')
const mongoose=require('mongoose')


const app = express()

mongoose.connect('mongodb://localhost',{
    useNewUrlParser: true, useUnifiedTopology: true
})
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    const articles=[{
        title:"Sakaja Wins...",
        createdAt:new Date(),
        link:"link",
        Descripttion:"Sakaja wins elections",
        markdown:"Sakaja wins elections"
    },
    {
        title:"Sakaja Wins... 2",
        createdAt:new Date(),
        link:"link",
        Descripttion:"Sakaja wins elections2",
        markdown:"Sakaja wins elections2"
    }
]
    res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)
app.listen(4040)