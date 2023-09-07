const nodemailer = require('nodemailer');



function generateVerificationCode(length) {
    const chars = '0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
  
    return code;
  }
  



const forgotPasswordMail = (userMail,userName)=>{
    


    const verificationCode = generateVerificationCode(4); // Generate a 4-digit code
    console.log('Generated Verification Code:', verificationCode);
    
    // Create a transporter object using your email service's SMTP settings

    const senderMail = 'mentcare193@gmail.com';
    const senderPassword = 'aaedhgevqdcorwvo';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: false,
        logger:false,
        debug: false,
        secureConnection: false,
        auth: {
        user: senderMail,
        pass: senderPassword,
        },
        
        tls:{
            rejectUnauthorized:true
        }
    });
    
// Define the email message
const mailOptions = {
    from: senderMail,
    to: userMail,
    subject: 'Password Reset Request for MentCare',
    html: `
      <p>Dear ${userName},</p>
      <p>We received a request to reset your password for your MentCare account. To complete the process, please use the following verification code:</p>
      <p><strong>Verification Code:</strong> ${verificationCode}</p>
      <p>Please enter this code on the password reset page to verify your identity.</p>
      <p>If you did not request this password reset, please ignore this email. Your account security is important to us.</p>
      <p>If you have any questions or need further assistance, please don't hesitate to contact our support team at ${senderMail}.</p>
      <p>Thank you for choosing MentCare.</p>
      <p>Sincerely,<br>The MentCare Team</p>
    `,
  };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email: ', error);
        } else {
        console.log('Email sent: ', info.response);
        }
    });
  return verificationCode;
}

module.exports = {forgotPasswordMail}
