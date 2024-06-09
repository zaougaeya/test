import Event from '../Models/event.js';
import User from '../Models/user.js';
import nodemailer from "nodemailer";
import { sendMail } from "../util/mail.js";
//import { generatePDF } from "../util/pdfGenerator.js";
import fs from "fs";
import { dirname } from 'path';

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
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lire un événement par ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('participants');
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

export const participantEvent = async (req, res) => {
  try {console.log('helo')
    const { userId } = req.body; 
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: "L'utilisateur participe déjà à cet événement" });
    }
    console.log('helo')

    if (event.numberOfPerson < event.participants.length) {
      console.log('1')
      // Ajouter l'utilisateur à la liste des participants
      return res.status(400).json({ message: "Aucune place disponible" });
      console.log('2')
      // Sauvegarder les modifications
      
      console.log('3')}
      console.log('5')
      event.participants.push(userId);
      await event.save();
     /*  // Générer le PDF
      const filePath = path.join(dirname, 'confirmation.pdf');
      await generatePDF({
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

      // Supprimer le fichier PDF après l'envoi de l'e-mail
      fs.unlinkSync(filePath); */
      // Envoyer l'e-mail
      // Envoyer l'e-mail
      const subject = "Confirmation de Participation";
      const text = `Bonjour ${user.prenomuser} ${user.nomuser},\n\nVous avez participé avec succès à l'événement ${event.eventname}.\n\nCordialement,\nL'équipe d'ArtyWaves`;
    

      await sendMail(user.mailuser, subject, text);



      res.status(200).json({ message: "Participation confirmée et email envoyé", event });
      console.log('6')
      
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
