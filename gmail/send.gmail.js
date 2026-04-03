import nodemailer from "nodemailer";
import cfg from '../cfg.js';

import {
  otpHtml,
  otpText,
  welcomeHtml,
  welcomeText,
  newPasswordHtml,
  newPasswordText,
} from "./template.gmail.js";





const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER || "onlinewithbeta@gmail.com",
        pass: process.env.GMAIL_PASS || cfg.GMAILPASS
    }
});
/*
// Verify transporter on startup
transporter.verify((error) => {
    if (error) {
        console.error('Email transporter failed:', error);
    } else {
        console.log('Email transporter ready');
    }
});

*/
async function sendEmail(Recipient, Subject, text, html) {
    // Input validation
    if (!Recipient || !Subject) {
        throw new Error('Recipient and Subject are required');
    }
    
    if (!text && !html) {
        throw new Error('Either text or html content is required');
    }

    try {
        console.log(`Sending email to: ${Recipient}`);
        
        const mailOptions = {
            from: '"onlinewithbeta" <onlinewithbeta@gmail.com>',
            to: Array.isArray(Recipient) ? Recipient.join(', ') : Recipient,
            subject: Subject,
            text: text,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log(`Email sent successfully: ${info.messageId}`);
        return {
            success: true,
            messageId: info.messageId,
            response: info.response
        };
        
    } catch (error) {
        console.error('Email sending failed:', {
            recipient: Recipient,
            error: error.message
        });
        
       // throw new Error(`Email delivery failed: ${error.message}`);
       throw new Error(`Currently unable to send otp. please contact 09117624342 ~Osiaru Group of Companies.`);
    }
}





export async function sendGmail(gmail, category, parameters) {

  let payLoad = {};
  /*
  {Subject,text,html}
  */

  if (category === "otp") {
    //parameters= 123456
    payLoad = {
      Subject: "Your Verification Code",
      text: otpText(parameters.value),
      html: otpHtml(parameters.value)
    }
  }
  if (category === "newPassword") {
    //parameters= {username,password}
    payLoad = {
      Subject: "Password Reset Confirmation",
      
      text: newPasswordText(parameters.username,parameters.password),
      
      html: newPasswordHtml(parameters.username,parameters.password)
    }
  }

  if (category === "welcome") {
    //parameters= {username,password}
    payLoad = {
      Subject: "Welcome to Our Platform",
      text: welcomeText(parameters.username,parameters.password),
      html: welcomeHtml(parameters.username,parameters.password)
    }
  }

  await sendEmail(gmail, payLoad.Subject, payLoad.text, payLoad.html);

}

