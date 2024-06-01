import sgMail from '@sendgrid/mail';

// Configuration de l'API Key de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Fonction pour envoyer un e-mail
export const sendEmail = async (to, subject, text) => {
  try {
    const msg = {
      to: to,
      from: 'votre-email@gmail.com', // Remplacez par votre adresse e-mail
      subject: subject,
      text: text,
    };
    await sgMail.send(msg);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
};
