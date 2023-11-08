import orderDetailService from "../service/orderDetailService";

const handleOrderDetailByID = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await orderDetailService.getOrderDetailByID(req.params.id);
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

const handleAddNewOrderDetail = async (req, res) => {
  try {
    if ((!req.body.id_order, !req.body.id_medicine, !req.body.quantity)) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await orderDetailService.addNewOrderDetail(
      req.body.id_order,
      req.body.id_medicine,
      req.body.quantity
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
  handleAddNewOrderDetail,
  handleOrderDetailByID,
};
