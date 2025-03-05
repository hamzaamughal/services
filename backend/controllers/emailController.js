const nodemailer = require("nodemailer");
// import Email from "../models/emailModel";

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }


  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.INFO_EMAIL_USER, // Ensure this is correct
        pass: process.env.INFO_EMAIL_PASS, // Ensure this is correct
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.INFO_EMAIL_USER, // Use the authenticated email as sender
      replyTo: email, // User email as reply-to
      to: process.env.EMAIL_USER, // Your email to receive the contact request
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>Contact Details</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);

    return res.status(200).json({ success: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);

    return res.status(500).json({
      error: "Failed to send email."
    });
  }
};

module.exports = { sendEmail };
