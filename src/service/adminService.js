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

const login = async (email, password) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute("SELECT * FROM admin WHERE email = ?", [email]);

    if (rows.length === 0) {
      return {
        EM: "This email doesn't exited",
        EC: "1",
        DT: "",
      };
    }
    const user = rows[0];
    let token = jwtActions.createJwt({
      email: user.email,
      name: user.name,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    if (password === user.password) {
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

const updateAdmin = async (id, name, email, password) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .execute(
        "update admin set name = ?, email= ?, password = ? where id = ?",
        [name, email, password, id]
      );
    return {
      EM: "Update Admin Successfully",
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
  login,
  updateAdmin,
};
