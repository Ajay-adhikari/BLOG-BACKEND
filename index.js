import dotenv from "dotenv"
import express from 'express';
import Connection from './database/db.js';
import cors from 'cors';
import bodyParser from "body-parser";
import router from "./routes/route.js";
const app=express();
const PORT=process.env.PORT || 8000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/' , router);
app.listen(PORT , ()=>{
    console.log("server is running  successfully");
})
const DB=process.env.KEYYYY;

Connection(DB);