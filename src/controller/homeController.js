import { json } from "body-parser";
import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleRegister = (req, res) => {
  return res.render("register.ejs");
};

const handleProcessRegister = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let address = req.body.address;
  let phone_number = req.body.phone_number;
  let birth_of_date = req.body.birth_of_date;
  let gender = req.body.gender;
  let password = req.body.password;
  let avatar = req.body.avatar;
  userService.createNewUser(
    name,
    email,
    address,
    phone_number,
    birth_of_date,
    gender,
    password,
    avatar
  );
  return res.redirect("/register");
};

const handleLogin = (req, res) => {
  return res.render("login.ejs");
};

const handleProcessLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const user = await userService.login(email, password);

  if (user) {
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

const handleUserManager = async (req, res) => {
  let userList = await userService.getAllUser();
  return res.render("userManager.ejs", { userList });
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user-manager");
};

const handleUpdateUser = async (req, res) => {
  const results = await userService.getUserByID(req.params.id);
  let userDetail = {};
  if (results && results.length > 0) {
    userDetail = results[0];
  }
  return res.render("userUpdate.ejs", { userDetail });
};

const handleProcessUpdateUser = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let address = req.body.address;
  let phone_number = req.body.phone_number;
  let birth_of_date = req.body.birth_of_date;
  let gender = req.body.gender;
  let id = req.body.id;
  let avatar = req.body.avatar;
  let avatar_old = req.body.avatar_old;

  if (avatar === "") {
    avatar = avatar_old;
  }

  userService.updateUser(
    id,
    name,
    email,
    address,
    phone_number,
    birth_of_date,
    gender,
    avatar
  );
  return res.redirect("/user-manager");
};

module.exports = {
  handleHelloWorld,
  handleRegister,
  handleProcessRegister,
  handleLogin,
  handleProcessLogin,
  handleUserManager,
  handleDeleteUser,
  handleUpdateUser,
  handleProcessUpdateUser,
};
