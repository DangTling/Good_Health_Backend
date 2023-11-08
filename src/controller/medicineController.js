import medicineService from "../service/medicineService";

const handleAllMedicine = async (req, res) => {
  try {
    const data = await medicineService.getAllMedicine();
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

const handleAddMedicine = async (req, res) => {
  try {
    if (
      (!req.body.name,
      !req.body.type,
      !req.body.company,
      !req.body.ingredient,
      !req.body.registration_number,
      !req.body.description,
      !req.body.usage_of_it,
      !req.body.side_effects,
      !req.body.note,
      !req.body.image,
      !req.body.image_second,
      !req.body.image_third)
    ) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await medicineService.addNewMedicine(
      req.body.name,
      req.body.type,
      req.body.company,
      req.body.ingredient,
      req.body.registration_number,
      req.body.description,
      req.body.usage_of_it,
      req.body.side_effects,
      req.body.note,
      req.body.image,
      req.body.image_second,
      req.body.image_third,
      req.body.price
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

const handleDeleteMedicine = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await medicineService.deleteMedicine(req.params.id);
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

const handleUpdateMedicine = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await medicineService.updateMedicine(
      req.params.id,
      req.body.name,
      req.body.type,
      req.body.company,
      req.body.ingredient,
      req.body.registration_number,
      req.body.description,
      req.body.usage_of_it,
      req.body.side_effects,
      req.body.note,
      req.body.image,
      req.body.image_second,
      req.body.image_third,
      req.body.price
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

const handleSearchMedicine = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    if (!searchTerm) {
      return res.status(400).json({
        EM: "Missing search term",
        EC: "0",
        DT: "",
      });
    }
    const data = await medicineService.searchMedicine(searchTerm);

    if (data) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      return res.status(404).json({
        EM: "No results found",
        EC: "0",
        DT: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  handleAllMedicine,
  handleAddMedicine,
  handleDeleteMedicine,
  handleUpdateMedicine,
  handleSearchMedicine,
};
