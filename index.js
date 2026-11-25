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
const users = database.collection("user");
const tuitions = database.collection("tuition");


//http://localhost:5000/ home route
app.get("/", (req, res) => {
    res.send("wellcome to menterolagbe apps")
})
//http://localhost:5000/users home route
app.get("/users", async (req, res) => {
    const cursor = users.find({});
    const result = await cursor.toArray()
    res.send(result)
})
//http://localhost:5000/tutor/post-tuition for post-tuition route
app.post("/tutor/post-tuition", async (req, res) => {
    const tuitionData = req.body;
    const result = await tuitions.insertOne(tuitionData);
    res.send(result)
})

app.listen(port, () => {
    console.log(`server stated successfully at: ${port}`);
})