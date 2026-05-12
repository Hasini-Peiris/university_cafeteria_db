import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoute from "./routes/userRoutes.js";
import menuRoute from "./routes/menuRoutes.js";
import orderRoute from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("University Cafeteria Preorder API Running");
});


app.use("/api/users", userRoute);
app.use("/api/menu", menuRoute);
app.use("/api/orders", orderRoute);


const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));