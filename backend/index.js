require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const rt = require("./routes/route");

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ DB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

app.use(cors());
app.use(express.json());

app.use("/", rt);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});