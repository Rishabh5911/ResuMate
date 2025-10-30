const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const resumeRoutes = require("./routes/resumeRoutes");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN, 
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());



const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,  
  max: 3, 
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      error: "Too many requests. Please try again later.",
    });
  },
});


app.use("/api/resume", limiter, resumeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
