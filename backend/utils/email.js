const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or other email services
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Your App <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  transporter.verify((error, success) => {
    if (error) {
      console.log("SMTP Error:", error);
    } else {
      console.log("SMTP Connected:", success);
    }
  });

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
