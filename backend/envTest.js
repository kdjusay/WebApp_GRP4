require("dotenv").config();  // Loads .env from the same folder

console.log("AWS_ACCESS_KEY:", process.env.AWS_ACCESS_KEY);
console.log("AWS_SECRET_KEY:", process.env.AWS_SECRET_KEY);
console.log("AWS_REGION:", process.env.AWS_REGION);
