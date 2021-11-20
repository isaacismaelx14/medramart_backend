import nodemailer, { Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import dotenv from "dotenv";

export class Mailer {
  private transporter: Transporter;
  constructor() {
    dotenv.config();
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_DIRECTION,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  start() {
    this.transporter.verify((error, success) => {
      if (error) console.log(error);
      else console.log(`📨 Mail server is ready`);
    });
  }

  sendMail(message: Mail.Options) {
    return this.transporter.sendMail(message);
  }
}
