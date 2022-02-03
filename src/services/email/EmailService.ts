import nodemailer from 'nodemailer';
;

export const EmailService = {
    async sendEmail({to, subject, message}: {
        to: string, subject: string, message: string
    }) {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
      
        // send mail with defined transport object
         return await transporter.sendMail({
          from: '"Auth Service👻"peterakinlolu1@gmail.com',
          to,
          subject,
          text: message
        });
    }
}