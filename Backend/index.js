import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import usersRoute from "./routes/users.js";

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(cors());

// Connect to the database
const URI = 'mongodb://localhost:27017/test';;
mongoose
    .connect(URI, {
        useNewUrlParser: true,
    })
    .then(() => console.log("Database connected..."))
    .catch((error) => console.log(error.message));

// Use routes
app.use("/user", usersRoute);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever running on port: ${PORT}`));