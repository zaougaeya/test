import nodemailer from 'nodemailer';

console.log('Starting test.js execution');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'meher.fe08@gmail.com',
        pass: 'kbijoebavdtepnzx' // Utilize the application-specific password here
    }
});

async function sendEmail() {
    try {
        // Construct email options
        const mailOptions = {
            from: 'meher.fe08@gmail.com',
            to: 'ferjani.meher@esprit.tn',
            subject: 'Account Verification',
            text: 'Please verify your account.'
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendEmail();

console.log('End of test.js execution');
