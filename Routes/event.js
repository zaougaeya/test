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

export default router;
