import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'meher.fe08@gmail.com',
        pass: 'kbijoebavdtepnzx' // Utilize the application-specific password here
    }
});

// Function to send email to multiple recipients
export async function sendEmail(recipients, subject, text) {
    try {
        const mailOptions = {
            from: 'meher.fe08@gmail.com',
            to: recipients.join(','), // Join email addresses with commas
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}