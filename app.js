const express=require('express')
const app = express()

app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    res.send('Home route')
})

app.listen(4040)