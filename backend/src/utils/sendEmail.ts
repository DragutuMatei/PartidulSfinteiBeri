
import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {

  let testAccount = await nodemailer.createTestAccount();

  console.log(testAccount)

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "fmavjn56tvgrwkks@ethereal.email", 
      pass: "CGQUjmyZZgeDTVaDWB",  
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',  
    to: to, 
    subject: "Change password", 
    html
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
