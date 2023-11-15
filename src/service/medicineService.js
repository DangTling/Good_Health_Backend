import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "good_health",
});

const addNewMedicine = async (
  name,
  type,
  company,
  ingredient,
  registration_number,
  description,
  usage_of_it,
  side_effects,
  note,
  image,
  image_second,
  image_third,
  price
) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "insert into medicine (name,type,company,ingredient,registration_number,description,usage_of_it,side_effects,note,image,image_second,image_third, price) values(?,?,?,?,?,?,?,?,?, ?, ?, ?, ?)",
        [
          name,
          type,
          company,
          ingredient,
          registration_number,
          description,
          usage_of_it,
          side_effects,
          note,
          image,
          image_second,
          image_third,
          price,
        ]
      );

    return {
      EM: "A medicine is created successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    return {
      EM: "Cann't add new medicine",
      EC: "1",
      DT: "",
    };
  }
};

const getAllMedicineByType = async (type) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from medicine where type=?", [type]);
    return {
      EM: "Get all medicine successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllMedicine = async () => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from medicine");
    return {
      EM: "Get all medicine successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteMedicine = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("delete from medicine where id = ?", [id]);
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

const updateMedicine = async (
  id,
  name,
  type,
  company,
  ingredient,
  registration_number,
  description,
  usage_of_it,
  side_effects,
  note,
  image,
  image_second,
  image_third,
  price
) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "update medicine set name = ?, type= ?, company = ?, ingredient = ?, registration_number = ?, description = ?, usage_of_it = ?, side_effects = ?, note = ?, image = ?, image_second = ?, image_third = ?, price = ?  where id = ?",
        [
          name,
          type,
          company,
          ingredient,
          registration_number,
          description,
          usage_of_it,
          side_effects,
          note,
          image,
          image_second,
          image_third,
          price,
          id,
        ]
      );
    return {
      EM: "Update Medicine Successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const searchMedicine = async (searchTerm) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "SELECT * FROM medicine WHERE name LIKE ? OR ingredient LIKE ?",
        [`%${searchTerm}%`, `%${searchTerm}%`]
      );

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

const detailMedicine = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("SELECT * FROM medicine WHERE id=?", [id]);

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
  getAllMedicine,
  addNewMedicine,
  deleteMedicine,
  updateMedicine,
  searchMedicine,
  getAllMedicineByType,
  detailMedicine,
};
