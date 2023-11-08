import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "good_health",
});

const addNewOrder = async (
  id_user,
  name_receiver,
  address_receiver,
  phone_number_receiver,
  total_payment
) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "insert into orders (id_user,name_receiver,address_receiver,phone_number_receiver,status,total_payment) values(?,?, ?, ?, ?, ?)",
        [
          id_user,
          name_receiver,
          address_receiver,
          phone_number_receiver,
          0,
          total_payment,
        ]
      );

    return {
      EM: "A Order is created successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    return {
      EM: "Cann't add new order",
      EC: "1",
      DT: "",
    };
  }
};

const getAllOrder = async () => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from orders");
    return {
      EM: "Get all orders successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllOrderByID = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from orders where id_user = ?", [id]);
    return {
      EM: "Get all orders successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteOrder = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("delete from orders where id = ?", [id]);
    return {
      EM: "Delete Successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const acceptOrder = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("update orders set status = ?  where id = ?", [1, id]);
    return {
      EM: "Accept Order Successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const cancelOrder = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("update orders set status = ?  where id = ?", [2, id]);
    return {
      EM: "Cancel Order Successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getAllOrder,
  getAllOrderByID,
  addNewOrder,
  deleteOrder,
  acceptOrder,
  cancelOrder,
};
