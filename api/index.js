import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"; //when importing files always add the .js otherwise it will crash, for libareries no need

const app = express();
dotenv.config();

const connect = async () => {
  try {
    //Connecting to mongodb via the secret key in the env file
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use("/auth", authRoute);  //if you're using this endpoint, use authRoute component

app.listen(3000, () => {
  connect();
  console.log("Connected to backend.");
});
