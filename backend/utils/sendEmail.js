const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, message }) => {
  try {
    let transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER_EMAIL,
        pass: process.env.SMTP_USER_PASSWORD,
      },
    });

    await transport.sendMail({
      from: "no-reply@temp.com", // address can be anything
      to,
      subject,
      html: message,
    });
    return true;
  } catch (error) {
    // console.log("error ", error);
    return false;
  }
};

module.exports = sendEmail;
