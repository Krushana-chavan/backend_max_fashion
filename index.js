const express = require('express')
require("dotenv").config()
port = process.env.port || 8081
const app = express()
const connection = require("./Config/config")
app.use(express.urlencoded({extended:true}))
const {authrouter} = require("./Routers/auth.routers")
app.use(express.json())

app.use("/auth",authrouter)

app.listen(port,async ()=>{
    try{
        await connection
        console.log("connected to database")
    }
    catch{
        console.log("error")
    }
    console.log(`listen on port ${port}`)
})

