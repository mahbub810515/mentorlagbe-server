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
const application = database.collection("application");


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
//http://localhost:5000/tutor/tuitions for post-tuition route
app.post("/tutor/tuitions", async (req, res) => {
  try {
    const tuitionData = req.body;
    const result = await tuitions.insertOne(tuitionData);
    res.status(201).send({
      success: true,
      message: "Tuition posted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error posting tuition:", error);
    res.status(500).send({
      success: false,
      message: "Failed to post tuition",
    });
  }
});
//http://localhost:5000/tutor/tuitions for get-tuition route
app.get("/tutor/tuitions", async (req, res) => {
  try {
    const result = await tuitions.find({}).toArray();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching tuitions:", error);
    res.status(500).send({
      message: "Failed to fetch tuition data",
    });
  }
});

//http://localhost:5000/student/application  for post-application route
app.post("/student/application", async (req, res) => {
  try {
    const applicationsData = req.body;

    const result = await application.insertOne(applicationsData);

    res.status(201).send({
      success: true,
      message: "Application submitted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error submitting application:", error);

    res.status(500).send({
      success: false,
      message: "Failed to submit application",
    });
  }
});
//http://localhost:5000/student/application  for get-application route
app.get("/student/application", async (req, res) => {
  try {
    const result = await application.find({}).toArray();
    res.status(200).send({
      success: true,
      message: "Applications fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch applications",
    });
  }
});

app.listen(port, () => {
    console.log(`server stated successfully at: ${port}`);
})