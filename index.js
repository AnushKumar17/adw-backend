// import express from 'express' -- Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
const express = require('express')
const mongoose = require('mongoose')
const dotenv= require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const addRoute = require('./routes/adds')
const commentRoute = require('./routes/comments')
const cookieParser = require('cookie-parser')
const app = express()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB 'Adds' is connected.")
    } catch (error) {
        console.log("Error in index.js file",error)
    }
}

// Middlewares
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoute) // this makes the backend api route for auth
app.use("/api/users",userRoute)
app.use("/api/adds",addRoute)
app.use("/api/comments",commentRoute)

app.listen(process.env.PORT ,() => {
    connectDB()
    console.log("App is running.")
})