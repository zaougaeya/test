import Local from "../Models/local.js";

// Créer un local
export const createLocal = async (req, res) => {
  try {
    const local = new Local(req.body);
    await local.save();
    res.status(201).json(local);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lire tous les locaux
export const getLocals = async (req, res) => {
  try {
    const locals = await Local.find().populate('locataire events');
    res.status(200).json(locals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lire un local par ID
export const getLocalById = async (req, res) => {
  try {
    const local = await Local.findById(req.params.id).populate('locataire events');
    if (!local) {
      return res.status(404).json({ message: "Local non trouvé" });
    }
    res.status(200).json(local);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un local par ID
export const updateLocal = async (req, res) => {
  try {
    const local = await Local.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!local) {
      return res.status(404).json({ message: "Local non trouvé" });
    }
    res.status(200).json(local);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un local par ID
export const deleteLocal = async (req, res) => {
  try {
    const local = await Local.findByIdAndDelete(req.params.id);
    if (!local) {
      return res.status(404).json({ message: "Local non trouvé" });
    }
    res.status(200).json({ message: "Local supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
