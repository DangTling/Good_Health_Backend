import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "good_health",
});

const addNewDisease = async (
  name,
  type,
  defination,
  symptom,
  reason,
  harm,
  treatment,
  image,
  image_second,
  image_third
) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "insert into disease (name,type,defination,symptom,reason,harm,treatment,image,image_second,image_third) values(?,?,?,?,?,?,?,?,?, ?)",
        [
          name,
          type,
          defination,
          symptom,
          reason,
          harm,
          treatment,
          image,
          image_second,
          image_third,
        ]
      );

    return {
      EM: "A Disease is created successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    return {
      EM: "Cann't add new disease",
      EC: "1",
      DT: "",
    };
  }
};

const getAllDisease = async () => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from disease");
    return {
      EM: "Get all disease successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteDisease = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("delete from disease where id = ?", [id]);
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

const updateDisease = async (
  id,
  name,
  type,
  defination,
  symptom,
  reason,
  harm,
  treatment,
  image,
  image_second,
  image_third
) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "update disease set name = ?, type= ?,defination = ?, symptom = ?, reason = ?, harm = ?, treatment =?, image = ?, image_second = ?, image_third = ?  where id = ?",
        [
          name,
          type,
          defination,
          symptom,
          reason,
          harm,
          treatment,
          image,
          image_second,
          image_third,
          id,
        ]
      );
    return {
      EM: "Update Disease Successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const searchDisease = async (searchTerm) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("SELECT * FROM disease WHERE name LIKE ? OR symptom LIKE ?", [
        `%${searchTerm}%`,
        `%${searchTerm}%`,
      ]);

    if (rows.length > 0) {
      return {
        EM: "Search successful",
        EC: "1",
        DT: rows,
      };
    } else {
      return {
        EM: "No results found",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getAllDisease,
  addNewDisease,
  deleteDisease,
  updateDisease,
  searchDisease,
};
