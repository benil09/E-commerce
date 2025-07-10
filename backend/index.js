import express from "express"
import dotenv from "dotenv"

dotenv.config();

const port = process.env.PORT;
console.log(port)
const app = express();
app.listen (port,()=>{
    console.log("server is running ")
   
})