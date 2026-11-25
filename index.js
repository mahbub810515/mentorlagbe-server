import express from "express";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;

//middlewere
app.use(express.json())
app.use(cors())
//http://localhost:5000/ home route
app.get("/",(req,res)=>{
    res.send("wellcome to menterolagbe apps")
})

app.listen(port,()=>{
    console.log(`server stated successfully at: ${port}`);
})