require("dotenv").config();

import jwt from "jsonwebtoken";

const createJwt = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    data = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return data;
};

const checkUserJwt = (req, res, next) => {
  // let cookies = req.cookies;
  // console.log(cookies.jwt);
  let cookies = req.headers.cookies;

  if (cookies) {
    let token = cookies;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = { role: "user" };
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "Not authenticated User",
        DT: "",
      });
    }
    console.log(">>>Jwt token: ", token);
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authenticated User",
      DT: "",
    });
  }
};

const checkUserRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({
        EM: "Permission denied",
        EC: "0",
        DT: "You do not have permission to access this resource.",
      });
    }
  };
};

const checkAdminJwt = (req, res, next) => {
  let cookies = req.cookies;
  if (cookies && cookies.jwt_admin) {
    let token = cookies.jwt_admin;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = { role: "admin" };
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "Not authenticated Admin",
        DT: "",
      });
    }
    console.log(">>>Jwt admin token: ", token);
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authenticated Admin",
      DT: "",
    });
  }
};

module.exports = {
  createJwt,
  verifyToken,
  checkUserJwt,
  checkUserRole,
  checkAdminJwt,
};
