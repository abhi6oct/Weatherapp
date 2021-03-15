const express = require("express")
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

// public static path
const staticpath = path.join(__dirname, "../public")
const template_hbs = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

app.set('view engine','hbs')
app.set("views",template_hbs)
hbs.registerPartials(partials_path)

app.use(express.static(staticpath))

// routing
app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/weather",(req,res)=>{
    res.render("weather")
})

app.get("*",(req,res)=>{
    res.render("404err",{
        errorMsg: 'Opps! Page Not Found'
    })
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})