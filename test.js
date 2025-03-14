require("dotenv").config({ path: __dirname + "/backend/.env" }); // Ensure correct .env path

const { MongoClient, ServerApiVersion } = require("mongodb");

// Load AWS credentials from .env
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_REGION = process.env.AWS_REGION;

console.log("AWS_ACCESS_KEY:", AWS_ACCESS_KEY);
console.log("AWS_SECRET_KEY:", AWS_SECRET_KEY);
console.log("AWS_REGION:", AWS_REGION);

// MongoDB Connection
const uri = "mongodb+srv://LearnVerse:learnverse01@cluster0.owqh1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
