// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
dotenv.config({
    path: './env'
})

import connectDB from "./db/index.js";

connectDB()

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