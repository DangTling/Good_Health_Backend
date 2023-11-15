import diseaseService from "../service/diseaseService";

const handleAllDisease = async (req, res) => {
  try {
    const data = await diseaseService.getAllDisease();
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
const handleAllDiseaseByType = async (req, res) => {
  try {
    const type = req.params.type;
    const data = await diseaseService.getAllDiseaseByType(type);
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

const handleDetailDisease = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await diseaseService.detailDisease(id);
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

const handleAddDisease = async (req, res) => {
  try {
    if (
      (!req.body.name,
      !req.body.type,
      !req.body.defination,
      !req.body.symptom,
      !req.body.reason,
      !req.body.harm,
      !req.body.treatment,
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
    const data = await diseaseService.addNewDisease(
      req.body.name,
      req.body.type,
      req.body.defination,
      req.body.symptom,
      req.body.reason,
      req.body.harm,
      req.body.treatment,
      req.body.image,
      req.body.image_second,
      req.body.image_third
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

const handleDeleteDisease = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await diseaseService.deleteDisease(req.params.id);
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

const handleUpdateDisease = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await diseaseService.updateDisease(
      req.params.id,
      req.body.name,
      req.body.type,
      req.body.defination,
      req.body.symptom,
      req.body.reason,
      req.body.harm,
      req.body.treatment,
      req.body.image,
      req.body.image_second,
      req.body.image_third
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

const handleSearchDisease = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    if (!searchTerm) {
      return res.status(400).json({
        EM: "Missing search term",
        EC: "0",
        DT: "",
      });
    }
    const data = await diseaseService.searchDisease(searchTerm);

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
  handleAllDisease,
  handleAddDisease,
  handleDeleteDisease,
  handleUpdateDisease,
  handleSearchDisease,
  handleAllDiseaseByType,
  handleDetailDisease,
};
