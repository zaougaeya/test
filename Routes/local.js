import express from "express";
<<<<<<< Updated upstream
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
=======
import { createLocal, getLocals,  updateLocal, deleteLocal } from "../Controllers/local.js";

const router = express.Router();

// Créer un local
router.post("/", createLocal);

// Lire tous les locaux
router.get("/", getLocals);



// Mettre à jour un local par ID
router.put("/:id", updateLocal);

// Supprimer un local par ID
>>>>>>> Stashed changes
router.delete("/:id", deleteLocal);

export default router;
