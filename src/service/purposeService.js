import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "good_health",
});

const addNewPurpose = async (id_medicine, id_disease) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("insert into purpose (id_medicine,id_disease) values(?,?)", [
        id_medicine,
        id_disease,
      ]);

    return {
      EM: "A Purpose is created successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    return {
      EM: "Cann't add new purpose",
      EC: "1",
      DT: "",
    };
  }
};

const getAllPurpose = async () => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from purpose");
    return {
      EM: "Get all purpose successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deletePurpose = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("delete from purpose where id = ?", [id]);
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

const updatePurpose = async (id, id_medicine, id_disease) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "update purpose set id_medicine = ?	,id_disease = ?  where id = ?",
        [id_medicine, id_disease, id]
      );
    return {
      EM: "Update Purpose Successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getAllPurpose,
  addNewPurpose,
  deletePurpose,
  updatePurpose,
};
