import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"; //when importing files always add the .js otherwise it will crash, for libareries no need
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

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

//middlewares- they are important because they can reach res.body
// when sending get hotels api request, the hotelsRoute middleware will be next in stack

app.use(express.json()); //enbales to send json api calls from postman

app.use("/api/auth", authRoute); //if you're using this endpoint, use authRoute component
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//this middleware is an err handler middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(3000, () => {
  connect();
  console.log("Connected to backend.");
});
