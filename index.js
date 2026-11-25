import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import { MongoClient } from 'mongodb';
dotenv.config();
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json())
app.use(cors())

const client = new MongoClient(process.env.MONGODB_URI);
export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}
const connectedClient = await connectToMongoDB();
const database = connectedClient.db("mentorlagbe");


//http://localhost:5000/ home route
app.get("/", (req, res) => {
    res.send("wellcome to menterolagbe apps")
})

app.listen(port, () => {
    console.log(`server stated successfully at: ${port}`);
})