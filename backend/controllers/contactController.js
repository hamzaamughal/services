const nodemailer = require("nodemailer");

exports.submitContactForm = async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Use your admin email for sending
      replyTo: email, // User's email as reply-to
      to: process.env.EMAIL_USER, // Your admin email receiving the message
      subject: "New Contact Form Submission",
      text: `You have received a new message:\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log("Email sent successfully:", info);
    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);

    return res.status(500).json({
      message: "Error sending email. Please try again later."
    });
  }
};
