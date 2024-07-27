import cors from "cors"
import cookieParser from "cookie-parser"

import express from "express"

const app = express();

app.use(cors({
    // origin: ex-www.instagram.com to allow intraction from frontend to server
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// handling data from request body
app.use(express.json({limit: "16kb"}));

// handling urls
app.use(express.urlencoded( {extended: true, limit: "16kb"} ));

// storing public assets(ex: files, photos, etc) into the server
app.use(express.static("public"));

// access & manupulate cookies on client server-side application
app.use(cookieParser());


export { app }