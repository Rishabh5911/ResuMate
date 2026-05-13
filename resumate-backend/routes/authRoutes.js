const express = require("express");
const { signup, login,forgotPassword,verifyOtp, resetPassword, logout, getAuthStatus } = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();


router.post("/signup",signup);

router.post("/verify-otp",verifyOtp);

router.post("/login",login);

router.get("/status",getAuthStatus);

router.post("/forgot-password",forgotPassword);

router.post("/reset-password",resetPassword);

router.post("/logout",authMiddleware,logout);


module.exports = router;