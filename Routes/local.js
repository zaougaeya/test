import express from "express";
import { createLocal, getLocals, getLocalById, updateLocal, deleteLocal } from "../Controllers/local.js";

const router = express.Router();

// Route pour créer un local
router.post("/", createLocal);

// Route pour lire tous les locaux
router.get("/", getLocals);

// Route pour lire un local par ID
router.get("/:id", getLocalById);

// Route pour mettre à jour un local par ID
router.put("/:id", updateLocal);

// Route pour supprimer un local par ID
router.delete("/:id", deleteLocal);

export default router;
