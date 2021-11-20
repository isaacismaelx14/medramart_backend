import nodemailer, { Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class Mailer {
  private transporter: Transporter;
  private config: SMTPTransport.Options = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_DIRECTION,
      pass: process.env.EMAIL_PASSWORD,
    },
  };
  constructor() {
    dotenv.config();
    this.transporter = nodemailer.createTransport(this.config);
  }

  start() {
    this.transporter.verify((error, success) => {
      if (error) console.log(error);
      else
        console.log(`📨 Mail server is ready from ${this.config.auth?.user}`);
    });
  }

  sendMail(message: Mail.Options) {
    return this.transporter.sendMail(message);
  }
}
