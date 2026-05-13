const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OTP = require("../models/OTP")
const { validateEmail, validatePassword } = require("../utils/validation");
const otpGenerator = require('otp-generator');
const sendEmail = require("../utils/sendEmail");




exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName?.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Full name is required" 
      });
  }

  if (!email?.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
  }

  if(!validateEmail(email)){
    return res.status(400).json({
      success:false,
      message:"Invalid email format"
    })
  }

  if (!password?.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Password is required" 
      });
  }

  if(!validatePassword(password)){
    return res.status(400).json({
      success:false,
      message:"Password must be at least 8 characters long"
    })
  }

  
    const existingUser = await User.findOne({email:email.trim().toLowerCase()});
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ success: false, message: "Email already registered. Please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        specialChars: false, 
        lowerCaseAlphabets: false 
      });

      await OTP.findOneAndUpdate(
      { email: email.trim().toLowerCase() },
      {
        fullName,
        password: hashedPassword,
        otp,
        isVerified: false,
        createdAt: Date.now(),
      },
      { upsert: true, new: true }
    );


    const result = await sendEmail(email,"Email Verification Code",`
       <div style="font-family: -apple-system, sans-serif; max-width: 400px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 16px; text-align: center;"> 
        <h2 style="margin-bottom: 16px;">ResuMate</h2> 
        <p style="color: #333; font-size: 14px; margin-bottom: 8px;">Dear User,</p>
        <p style="color: #333; font-size: 14px; margin-bottom: 8px;">Thank you for registering with ResuMate. To complete your registration, please use the following OTP (One-Time Password) to verify your account.</p>
        <p style="color: #666; font-size: 14px; margin-bottom: 24px;">Your verification code is:</p>
        <div style="margin: 24px 0; font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #000;">${otp}</div> 
        <p style="font-size: 12px; color: #999;">Valid for 5 minutes. If you didn't request this, ignore safely.</p>
</div>
      `);

      if(!result.success){
        return res.status(500).json({
          success:false,
          message:"Failed to send email"
        })
      }

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in Signup:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to signup. Please try again." 
    });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const { email,otp } = req.body; 

    
  if (!email?.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
  }

   if(!validateEmail(email)){
    return res.status(400).json({
      success:false,
      message:"Invalid email format"
    })
  }

 
  if (!otp?.trim()) {
    return res.status(400).json({
      success:false,
      message:"OTP is required"
    })
  }

    const otpRecord = await OTP.findOne({ email:email.trim().toLowerCase() });
    if (!otpRecord) return res.status(400).json({ message: "OTP expired or invalid" });
    
    if(otp !== otpRecord.otp){
      return res.status(400).json({
        success:false,
        message:"Invalid OTP"
      })
    }

    await User.create({
      fullName: otpRecord.fullName,
      email,
      password: otpRecord.password,
      isVerified: true,
    });

    await OTP.deleteOne({ email });

    res.status(201).json({ 
      success:true,
      message: "Account created successfully" 
    });

  } catch (error) {
    console.error("Error in verifyOtp:",error.message);
    res.status(500).json({
      success:false,
      message:"Failed to verify OTP. Please try again.",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
  }

   if(!validateEmail(email)){
    return res.status(400).json({
      success:false,
      message:"Invalid email format"
    })
  }

  if (!password?.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Password is required" 
      });
  }


    const user = await User.findOne({email:email.trim().toLowerCase()});
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
    { 
      id: user._id,
      name: user.fullName
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({ success: true, message: "Logged in successfully"});
  } catch (error) {
    console.error("Error in Login:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to login. Please try again." 
    });
  }
};


exports.forgotPassword = async (req,res) => {
  try{
    const {email} = req.body;

    if(!email?.trim()){
      return res.status(400).json({
        success:false,
        message:"Email is required"
      })
    }

    if(!validateEmail(email)){
      return res.status(400).json({
        success:false,
        message:"Invalid email format"
      })
    }

    const user = await User.findOne({email:email.trim().toLowerCase()});
    if(!user){
      return res.status(404).json({
        success:false,
        message:"No user found with this email"
      })
    }

  const resetToken = crypto.randomBytes(32).toString('hex'); 
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.tokenExpiry = Date.now() + 3600000;
  
  await user.save();

  const url = `${process.env.ALLOWED_ORIGIN}/reset-password?token=${resetToken}`;

  const result = await sendEmail(email,
    "Password Reset Request",
    `<div style="font-family: -apple-system, sans-serif; max-width: 400px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 16px; text-align: center;"> 
        <h2 style="margin-bottom: 16px;">ResuMate</h2> 
        <p style="color: #333; font-size: 14px; margin-bottom: 8px;">Dear User,</p>
        <p style="color: #333; font-size: 14px; margin-bottom: 24px;">To reset your password, please click the link below:</p>
        <a href="${url}">Click here to reset your password</a>
        <p style="font-size: 12px; color: #999;">Valid for 1 hour. If you didn't request this, ignore safely.</p>
</div>
      `
  );

  if(!result.success){
    return res.status(500).json({
      success:false,
      message:"Failed to send email"
    })
  }

  return res.status(200).json({ success: true, message: "email sent successfully" });

  }catch(error){
    console.error("Error in forgotPassword:", error.message);
    return res.status(500).json({
      success:false,
      message:"Failed to forgot password. Please try again"
    })
  }
}



exports.resetPassword = async (req,res) => {
  try{
    const {newPassword,token} = req.body;

    if(!newPassword?.trim()){
      return res.status(400).json({
        success:false,
        message:"New password is required"
      })
    }

    if(!validatePassword(newPassword)){
      return res.status(400).json({
        success:false,
        message:"Password must be at least 8 characters long"
      })
    }

    if(!token?.trim()){
      return res.status(400).json({
        success:false,
        message:"Token is required"
      })
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      tokenExpiry: { $gt: Date.now() }
    });

    if(!user){
      return res.status(400).json({
        success:false,
        message:"Invalid or expired token"
      })
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success:true,
      message:"Password reset successfully"
    })


  }catch(error){
    console.error("Error in resetPassword:",error.message);
    return res.status(500).json({
      success:false,
      message:"Failed to reset password. Please try again"
    })
  }
}


exports.getAuthStatus  = (req,res) => {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found"
      });
    }
      
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

    return res.status(200).json({ 
      success:true,
      message:"User is authenticated",
      data: {
        userId: decoded.id,
        name: decoded.name
      }
    });
  } catch (error) {
    console.error("Error in getAuthStatus:",error.message);
    return res.status(401).json({ 
      success:false,
      message:"Token invalid or expired"
    });
  }
}

exports.logout = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0), 
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout:",error.message);
    res.status(500).json({
      success: false,
      message: "Failed to logout. Please try again",
    });
  }
};