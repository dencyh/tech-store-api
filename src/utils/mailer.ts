import nodemailer, { SendMailOptions } from "nodemailer";
import { UserDocument } from "../model/user.model";
import logger from "./logger";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD
  }
});

export async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      logger.error(err, "Error sending email");
      return;
    }

    logger.info("Message sent: %s", info.messageId);
    logger.info(`Preview URL ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export async function sendVerificationEmail(user: UserDocument) {
  sendEmail({
    from: '"BT Store" <bts.store.autoreply@gmail.com>',
    to: user.email,
    subject: "Verification", //
    html: `<div style="text-align: center; color:#e4e4e4; padding: 40px"><div style="margin:0 auto; max-width: 500px; padding:30px;border-radius: 15px; background: #2c2c2d"><h3>Welcome to BT Store  🛒, ${user.firstName} ${user.lastName}!</h3><h2 style="font-weight: normal" ><a style="color: #c896ff" href='${process.env.API_URL}/api/verify/${user._id}/${user.verificationCode}'>Click here to confirm your e-mail address!</a></h2></div></div>`
  });
}
