import express  from "express";
import bootstrap from "./src/index.Router.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

bootstrap(app,express);

app.listen(parseInt(process.env.port),()=>{
    console.log(`Connected on Port ${parseInt(process.env.port)}`);
})