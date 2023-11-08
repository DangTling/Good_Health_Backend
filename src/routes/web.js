import express from "express";
import {
  handleRegister,
  handleHelloWorld,
  handleProcessRegister,
  handleLogin,
  handleProcessLogin,
  handleUserManager,
  handleDeleteUser,
  handleUpdateUser,
  handleProcessUpdateUser,
} from "../controller/homeController";
import { handleMedicineManager } from "../controller/medicineController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", handleHelloWorld);
  router.get("/register", handleRegister);
  router.post("/process_register", handleProcessRegister);
  router.get("/login", handleLogin);
  router.post("/process_login", handleProcessLogin);
  router.get("/user-manager", handleUserManager);
  router.post("/delete-user/:id", handleDeleteUser);
  router.get("/update-user/:id", handleUpdateUser);
  router.post("/process_update", handleProcessUpdateUser);
  // router.get("/medicine-manager", handleMedicineManager);
  return app.use("/", router);
};

export default initWebRoutes;
