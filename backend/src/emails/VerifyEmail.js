const nodemailer = require("nodemailer");

const sendVerifyEmail = async ({ name, email, link }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: `${name} <${email}>`,
    subject: "Verify your email",
    html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Verify Your Email</title>
              <style>
                  /* Inlined CSS for maximum email client compatibility */
                  body { font-family: sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; line-height: 1.6; -webkit-text-size-adjust: none; }
                  .container { max-width: 600px; margin: 20px auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }
                  .header { text-align: center; margin-bottom: 30px; }
                  .logo { max-width: 200px; display: block; margin: 0 auto 20px; background-color: #26556b; padding: 10px; border-radius: 10px;}
                  h1 { color: #29abe2; margin-bottom: 10px; }
                  p { margin-bottom: 20px; }
                  .cta-button { display: inline-block; padding: 12px 24px; background-color: #29abe2; color: #fff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease; }
                  .cta-button:hover { background-color: #218dbb; }
                  .footer { text-align: center; margin-top: 30px; color: #777; font-size: 14px; }
                  .highlight { font-weight: bold; }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <a href="https://rojlekho.com"><img class="logo" src="https://res.cloudinary.com/dzjujoqyi/image/upload/v1734201418/rojlekho-logo.png" alt="Your Brand Logo"></a>
                      <h1>Verify Your Email Address</h1>
                  </div>

                  <p>Hi ${name},</p>

                  <p>Thanks for signing up! To complete your registration and gain full access to RojLekho.com, please click the button below to verify your email address: ${email}</p>

                  <div style="text-align: center;">
                      <a class="cta-button" href="${link}">Verify Email</a>
                  </div>

                  <p>This link will expire in 24 hours.</p>

                  <p>If you did not request this email, please ignore it.</p>

                  <div class="footer">
                      <p>&copy; 2024 Your Company. All rights reserved. | <a href="https://rojlekho.com/email-unsubscribe" style="color:#777;">Unsubscribe</a></p>
                  </div>
              </div>
          </body>
          </html>
        `,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred. " + error.message);
      return process.exit(1);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = sendVerifyEmail;