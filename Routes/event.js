<<<<<<< Updated upstream
import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controllers/event.js";

const router = express.Router();

// Route pour créer un événement
router.post("/", createEvent);

// Route pour lire tous les événements
router.get("/", getEvents);

// Route pour lire un événement par ID
router.get("/:id", getEventById);

// Route pour mettre à jour un événement par ID
router.put("/:id", updateEvent);

// Route pour supprimer un événement par ID
router.delete("/:id", deleteEvent);

=======
// ../Routes/event.js

import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, participantEvent, searchEventByName, searchEventByPrice } from "../Controllers/event.js";
import { sendMail } from "../util/mail.js"; // Assurez-vous que la fonction sendMail est correctement exportée

const router = express.Router();

// Créer un événement
router.post("/", createEvent);

// Lire tous les événements
router.get("/", getEvents);

// Lire un événement par ID
router.get("/:id", getEventById);

// Mettre à jour un événement par ID
router.put("/:id", updateEvent);

// Supprimer un événement par ID
router.delete("/:id", deleteEvent);

// Participer à un événement
router.put("/:id/participate", participantEvent);

// Rechercher des événements par nom
router.get("/search/name", searchEventByName);

// Rechercher des événements par prix
router.get("/search/price", searchEventByPrice);

>>>>>>> Stashed changes
export default router;
