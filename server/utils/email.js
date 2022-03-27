const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `John Doe <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    message: options.message,
    html: options.html,
  };

  await nodemailer.sendMail(mailOptions);
};

module.exports = sendEmail;
