import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "good_health",
});

const addNewOrderDetail = async (id_order, id_medicine, quantity) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "insert into order_detail (id_order,	id_medicine,	quantity) values(?,?,?)",
        [id_order, id_medicine, quantity]
      );

    return {
      EM: "A Order Detail is created successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    return {
      EM: "Cann't add new order detail",
      EC: "1",
      DT: "",
    };
  }
};

const getOrderDetailByID = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from order_detail where id_order = ?", [id]);
    return {
      EM: "Get this order detail successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  addNewOrderDetail,
  getOrderDetailByID,
};
