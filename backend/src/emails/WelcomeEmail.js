const nodemailer = require("nodemailer");

const welcomeEmail = async ({email, name}) => {
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
    subject: "Welcome to Roj Lekho 🎉",
    html: `
        <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Roj Lekho!</title>
              <style>
                  /* Inlined CSS for maximum email client compatibility */
                  body { font-family: sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; line-height: 1.6; -webkit-text-size-adjust: none; }
                  .container { max-width: 600px; margin: 20px auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }
                  .header { text-align: center; margin-bottom: 30px; }
                  .logo { max-width: 200px; display: block; margin: 0 auto 20px; background-color: #26556b; padding: 10px; border-radius: 10px;}
                  h1 { color: #29abe2; margin-bottom: 10px; }
                  p { margin-bottom: 20px; }
                  ul { padding-left: 20px; margin-bottom: 20px;}
                  li { margin-bottom: 10px;}
                  .cta-button { display: inline-block; padding: 12px 24px; background-color: #29abe2; color: #fff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease; }
                  .cta-button:hover { background-color: #218dbb; }
                  .footer { text-align: center; margin-top: 30px; color: #777; font-size: 14px; }
                  .highlight { font-weight: bold; }
                  .emoji { font-size: 1.2em; vertical-align: middle; margin-right: 5px;} /* Adjust emoji size */
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <a href="https://rojlekho.com"><img class="logo" src="https://res.cloudinary.com/dzjujoqyi/image/upload/v1734201418/rojlekho-logo.png" alt="Roj Lekho Logo"></a>
                      <h1>Welcome to Roj Lekho! 🎉</h1>
                  </div>

                  <p>Hi ${name}, 👋</p>

                  <p>We're excited to have you join Roj Lekho, your personal online diary. Start capturing your daily moments and reflections in a safe and accessible space. ✍️</p>

                  <p>With Roj Lekho, you can:</p>
                  <ul>
                      <li><span class="emoji">💻</span><span class="highlight">Write anywhere:</span> Access your diary from any device with an internet connection.</li>
                      <li><span class="emoji">💡</span><span class="highlight">Reflect on your day:</span> Track your progress and gain valuable insights.</li>
                      <li><span class="emoji">🔒</span><span class="highlight">Keep your memories safe:</span> Your entries are securely stored and private.</li>
                  </ul>

                  <p>Ready to start journaling?</p>
                  <div style="text-align: center;">
                      <a class="cta-button" href="https://app.rojlekho.com">Start Writing Now 🚀</a>
                  </div>

                  <div class="footer">
                      <p>&copy; 2024 Roj Lekho. All rights reserved. | <a href="https://rojlekho.com/email-unsubscribe" style="color:#777;">Unsubscribe</a></p>
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

module.exports = welcomeEmail;
