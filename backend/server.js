const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')
dotenv.config()
const cors = require('cors')

app.use(cors())
app.use(express.json())
mongoose.connect(process.env.URI)
.then(()=>{
    console.log("Connected Successfully")
    app.listen(process.env.PORT || 8000, (err)=>{
        if(err){console.log(err)}
        else{
            console.log("running sucessfully at", process.env.PORT)
        }
    })
})
.catch((err)=>{
    console.log(err)
})

app.use(userRoute)



