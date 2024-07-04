import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text, attachments) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'meher.fe08@gmail.com', 
      pass: 'kbijoebavdtepnzx', 
    },
  });

  let mailOptions = {
    from: 'meher.fe08@gmail.com',
    to: to,
    subject: subject,
    text: text,
    attachments: attachments,
  };

  await transporter.sendMail(mailOptions);
};
