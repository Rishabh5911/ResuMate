const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();


app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN, 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());



const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,  
  max: 3, 
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: "Daily usage limit exceeded. Check back later.",
    });
  },
});


app.use("/api/resume", limiter, resumeRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/dashboard",dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
