const nodemailer = require("nodemailer");

exports.submitContactForm = async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Replace with your admin email
        pass: process.env.EMAIL_PASS, // Replace with your email password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Replace with your admin email
      subject: "New Contact Form Submission",
      text: `You have received a new message:\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending email. Please try again later." });
  }
};
