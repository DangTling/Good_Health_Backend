import purposeService from "../service/purposeService";

const handleAllPurpose = async (req, res) => {
  try {
    const data = await purposeService.getAllPurpose();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleAddPurpose = async (req, res) => {
  try {
    if (!req.body.id_medicine && !req.body.id_disease) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await purposeService.addNewPurpose(
      req.body.id_medicine,
      req.body.id_disease
    );
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleDeletePurpose = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await purposeService.deletePurpose(req.params.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleUpdatePurpose = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await purposeService.updatePurpose(
      req.params.id,
      req.body.id_medicine,
      req.body.id_disease
    );
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  handleAllPurpose,
  handleAddPurpose,
  handleDeletePurpose,
  handleUpdatePurpose,
};
