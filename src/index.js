// require('dotenv').config({path: './env'})

import { app } from "./app.js";
import dotenv from "dotenv"
dotenv.config({
    path: './env'
})

import connectDB from "./db/index.js";

connectDB()
.then( () => {
    app.on("error", (error) => {
        console.log("Error connecting Server ", error);
        process.exit(1)
    })
    
    app.listen((process.env.PORT || 8000), () => {
        console.log(`Server Conention established at PORT: ${process.env.PORT}`);
        
    })

})
.catch((error) => {
    console.log("MongoDB connection Failed !!!: ", error)
    process.exit(1);
})









/*

import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";

import express from "express"
const app = express()

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONOGDB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error connecting express", error)
            throw error;
        })
        app.listen((process.env.PORT), () => {
            console.log(`app is listening on port ${process.env.PORT}`);
        })
    }
    catch (error) {
        console.log("Error connecting DB", error);
    }
}) ()

*/