import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'eya.zaouga@esprit.tn',
        pass: '221SFT6924',
    },
});

export const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'eya.zaouga@esprit.tn',
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};
