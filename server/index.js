const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use('/auth',authRoutes)

app.listen(PORT, () => console.log("http://localhost:3000"));
