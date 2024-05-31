import Local from "../Models/local.js";

// Créer un local
export const createLocal = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const local = new Local(req.body);
    await local.save();
    res.status(201).json(local);
=======
    const newLocal = new Local(req.body);
    await newLocal.save();
    res.status(201).json(newLocal);
>>>>>>> Stashed changes
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lire tous les locaux
export const getLocals = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const locals = await Local.find().populate('locataire events');
    res.status(200).json(locals);
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
    const locals = await Local.find();
    res.status(200).json(locals);
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la lecture des locaux." });
>>>>>>> Stashed changes
  }
};

// Lire un local par ID
<<<<<<< Updated upstream
export const getLocalById = async (req, res) => {
  try {
    const local = await Local.findById(req.params.id).populate('locataire events');
    if (!local) {
      return res.status(404).json({ message: "Local non trouvé" });
    }
    res.status(200).json(local);
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
export const getLocal = async (req, res) => {
  try {
    const local = await Local.findById(req.params.id).populate('locataire events');
    if (!local) {
      return res.status(404).json({ message: "Local non trouvé." });
    }
    res.status(200).json(local);
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la lecture du local." });
>>>>>>> Stashed changes
  }
};

// Mettre à jour un local par ID
export const updateLocal = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const local = await Local.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!local) {
      return res.status(404).json({ message: "Local non trouvé" });
    }
    res.status(200).json(local);
=======
    const updatedLocal = await Local.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLocal) {
      return res.status(404).json({ message: "Local non trouvé." });
    }
    res.status(200).json(updatedLocal);
>>>>>>> Stashed changes
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un local par ID
export const deleteLocal = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const local = await Local.findByIdAndDelete(req.params.id);
    if (!local) {
      return res.status(404).json({ message: "Local non trouvé" });
    }
    res.status(200).json({ message: "Local supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
    const deletedLocal = await Local.findByIdAndDelete(req.params.id);
    if (!deletedLocal) {
      return res.status(404).json({ message: "Local non trouvé." });
    }
    res.status(200).json({ message: "Local supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du local." });
>>>>>>> Stashed changes
  }
};
