import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text, attachments) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'votre.email@gmail.com', // Remplacez par votre email
      pass: 'votre.mot.de.passe', // Remplacez par votre mot de passe
    },
  });

  let mailOptions = {
    from: 'votre.email@gmail.com',
    to: to,
    subject: subject,
    text: text,
    attachments: attachments,
  };

  await transporter.sendMail(mailOptions);
};
