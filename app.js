const express=require('express')
const app = express()

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

app.listen(4040)