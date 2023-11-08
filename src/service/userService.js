import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwtActions from "../middleware/jwtActions";
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "good_health",
});

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = async (
  name,
  email,
  address,
  phone_number,
  birth_of_date,
  gender,
  password,
  avatar
) => {
  try {
    const hash = bcrypt.hashSync(password, salt);
    const [rows, fields] = await connection
      .promise()
      .execute(
        "insert into user (name,email,address,phone_number,birth_of_date,gender,password, avatar, salt) values(?,?,?,?,?,?,?,?,?)",
        [
          name,
          email,
          address,
          phone_number,
          birth_of_date,
          gender,
          hash,
          avatar,
          salt,
        ]
      );

    return {
      EM: "A user is created successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    return {
      EM: "Cann't add new user",
      EC: "1",
      DT: "",
    };
  }
};

const login = async (email, password) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("SELECT * FROM user WHERE email = ?", [email]);

    if (rows.length === 0) {
      return {
        EM: "This email doesn't exited",
        EC: "1",
        DT: "",
      };
    }
    const user = rows[0];
    const hashedPassword = user.password;
    const salt = user.salt;
    let token = jwtActions.createJwt({
      email: user.email,
      name: user.name,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    if (bcrypt.hashSync(password, salt) === hashedPassword) {
      return {
        EM: "Login successfully",
        EC: "1",
        DT: {
          access_token: token,
        },
      };
    } else {
      return {
        EM: "This password isn't correct",
        EC: "1",
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllUser = async () => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from user");
    return {
      EM: "Get all user successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserInfo = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from user where id = ?", [id]);
    return {
      EM: "Get Infomation about this user successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUsersByPage = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const [rows, fields] = await connection
      .promise()
      .execute("SELECT * FROM user LIMIT ? OFFSET ?", [limit, offset]);

    return {
      EM: "Get users by page successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("delete from user where id = ?", [id]);
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

const getUserByID = async (id) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("select * from user where id = ?", [id]);
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateUser = async (
  id,
  name,
  email,
  address,
  phone_number,
  birth_of_date,
  gender,
  avatar
) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "update user set name = ?, email= ?, address = ?, phone_number = ?, birth_of_date = ?, gender = ?, avatar = ? where id = ?",
        [name, email, address, phone_number, birth_of_date, gender, avatar, id]
      );
    return {
      EM: "Update User Successfully",
      EC: "1",
      DT: rows,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  hashPassword,
  createNewUser,
  login,
  getAllUser,
  deleteUser,
  getUserByID,
  updateUser,
  getUsersByPage,
  getUserInfo,
};
