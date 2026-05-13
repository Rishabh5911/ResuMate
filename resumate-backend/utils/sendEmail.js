const nodemailer = require('nodemailer');

const sendEmail = async(email,subject,htmlContent) =>{
  try{
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
  });

  await transporter.sendMail({
    from: `"ResuMate" <${process.env.MAIL_USER}>`,
    to: email,
    subject: subject,
    html: htmlContent,
  })

  return { success: true };
  }catch(error){
    console.error('Error in sendEmail:', error.message);
    return { 
      success: false, 
      message: "Failed to send email. Please try again." };
  }
}

module.exports = sendEmail;