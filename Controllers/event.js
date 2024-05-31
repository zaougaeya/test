<<<<<<< Updated upstream
import Event from '../Models/event.js';
=======
// ../Controllers/event.js

import Event from '../Models/event.js';
import User from '../Models/user.js';
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { promisify } from "util";
import { writeFileSync, unlinkSync } from "fs";
import path from "path";

// Fonction pour générer le PDF
const generatePDF = (eventDetails, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(writeFileSync(filePath));
  doc.fontSize(25).text(`Confirmation de Participation à l'événement`, { align: 'center' });
  doc.text(`Nom de l'événement : ${eventDetails.eventname}`);
  doc.text(`Description : ${eventDetails.descevent}`);
  doc.text(`Date de début : ${eventDetails.datdebevent}`);
  doc.text(`Date de fin : ${eventDetails.datfinevent}`);
  doc.text(`Prix : ${eventDetails.prixevent}`);
  doc.end();
};

// Fonction pour envoyer le mail
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
>>>>>>> Stashed changes

// Créer un événement
export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lire tous les événements
export const getEvents = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const events = await Event.find().populate('locataire participants');
=======
    const events = await Event.find();
>>>>>>> Stashed changes
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lire un événement par ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('locataire participants');
    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un événement par ID
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

<<<<<<< Updated upstream
=======
// Participer à un événement
export const participantEvent = async (req, res) => {
  try {
    const { userId } = req.body; // Obtenez l'ID de l'utilisateur à partir du corps de la requête
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    // Vérifiez si l'utilisateur est déjà un participant
    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: "L'utilisateur participe déjà à cet événement" });
    }

    // Vérifiez s'il reste des places disponibles
    if (event.numberOfPerson > event.participants.length) {
      // Ajouter l'utilisateur à la liste des participants
      event.participants.push(userId);
      // Sauvegarder les modifications
      await event.save();

      // Récupérer les informations de l'utilisateur
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // Générer le PDF
      const filePath = path.join("public", "confirmation.pdf");
      generatePDF({
        eventname: event.eventname,
        descevent: event.descevent,
        datdebevent: event.datdebevent,
        datfinevent: event.datfinevent,
        prixevent: event.prixevent
      }, filePath);

      // Envoyer l'e-mail
      const subject = "Confirmation de Participation";
      const text = `Bonjour ${user.prenomuser} ${user.nomuser},\n\nVous avez participé avec succès à l'événement ${event.eventname}.\n\nCordialement,\nL'équipe d'ArtyWaves`;
      const attachments = [
        {
          filename: "confirmation.pdf",
          path: filePath
        }
      ];

      await sendMail(user.mailuser, subject, text, attachments);

      res.status(200).json(event);
    } else {
      res.status(400).json({ message: "Aucune place disponible" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

>>>>>>> Stashed changes
// Supprimer un événement par ID
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }
    res.status(200).json({ message: "Événement supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< Updated upstream

=======
// Recherche par nom d'événement
export const searchEventByName = async (req, res) => {
  try {
    const { name } = req.query;
    const events = await Event.find({ eventname: { $regex: name, $options: 'i' } });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Recherche par prix d'événement
export const searchEventByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const events = await Event.find({ prixevent: { $gte: minPrice, $lte: maxPrice } });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
>>>>>>> Stashed changes
