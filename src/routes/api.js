import express from "express";
import userController from "../controller/userController";
import medicineController from "../controller/medicineController";
import diseaseController from "../controller/diseaseController";
import purposeController from "../controller/purposeController";
import orderController from "../controller/orderController";
import orderDetailController from "../controller/orderDetailController";
import adminController from "../controller/adminController";
import {
  checkUserJwt,
  checkUserRole,
  checkAdminJwt,
} from "../middleware/jwtActions";

const router = express.Router();

const initApiRoutes = (app) => {
  router.post("/user/register", userController.handleRegister);
  router.post("/user/login", userController.handleLogin);
  router.post("/admin/login", adminController.handleLogin);

  // router.use(checkUserJwt);
  // router.use(checkUserRole(["user", "admin"]));
  router.get("/user/logout", checkUserJwt, userController.handleLogout);
  router.get("/user/info/:email", checkUserJwt, userController.handleUserInfo);
  router.put("/user/update/:id", checkUserJwt, userController.handleUpdateUser);

  // router.use(checkAdminJwt);
  // router.use(checkUserRole(["admin"]));
  router.get("/admin/logout", checkAdminJwt, adminController.handleLogout);
  router.get("/user", checkAdminJwt, userController.handleAllUser);
  router.delete(
    "/user/delete/:id",
    checkAdminJwt,
    userController.handleDeleteUser
  );
  router.post(
    "/medicine/add",
    checkAdminJwt,
    medicineController.handleAddMedicine
  );
  router.delete(
    "/medicine/delete/:id",
    checkAdminJwt,
    medicineController.handleDeleteMedicine
  );
  router.put(
    "/medicine/update/:id",
    checkAdminJwt,
    medicineController.handleUpdateMedicine
  );
  router.post(
    "/disease/add",
    checkAdminJwt,
    diseaseController.handleAddDisease
  );
  router.delete(
    "/disease/delete/:id",
    checkAdminJwt,
    diseaseController.handleDeleteDisease
  );
  router.put(
    "/disease/update/:id",
    checkAdminJwt,
    diseaseController.handleUpdateDisease
  );
  router.post(
    "/purpose/add",
    checkAdminJwt,
    purposeController.handleAddPurpose
  );
  router.delete(
    "/purpose/delete/:id",
    checkAdminJwt,
    purposeController.handleDeletePurpose
  );
  router.put(
    "/purpose/update/:id",
    checkAdminJwt,
    purposeController.handleUpdatePurpose
  );
  router.get("/order", checkAdminJwt, orderController.handleAllOrder);
  router.delete(
    "/order/delete/:id",
    checkAdminJwt,
    orderController.handleDeleteOrder
  );
  router.put(
    "/order/accept/:id",
    checkAdminJwt,
    orderController.handleAcceptOrder
  );
  router.put(
    "/order/cancel/:id",

    orderController.handleCancelOrder
  );

  // router.use(checkUserRole(["user", "admin"]));
  router.get("/medicine", checkUserJwt, medicineController.handleAllMedicine);
  router.get(
    "/medicine/detail/:id",
    checkUserJwt,
    medicineController.handleDetailMedicine
  );
  router.get(
    "/disease/detail/:id",
    checkUserJwt,
    diseaseController.handleDetailDisease
  );
  router.get(
    "/medicine/:type",
    checkUserJwt,
    medicineController.handleAllMedicineByType
  );
  router.get(
    "/medicine/search/:searchTerm",
    checkUserJwt,
    medicineController.handleSearchMedicine
  );
  router.get("/disease", checkUserJwt, diseaseController.handleAllDisease);
  router.get(
    "/disease/:type",
    checkUserJwt,
    diseaseController.handleAllDiseaseByType
  );
  router.get(
    "/disease/search/:searchTerm",
    checkUserJwt,
    diseaseController.handleSearchDisease
  );
  router.get("/purpose", checkUserJwt, purposeController.handleAllPurpose);
  router.get("/order/:id", orderController.handleAllOrderByID);
  router.post("/order/add", orderController.handleAddOrder);
  router.get("/order_detail/:id", orderDetailController.handleOrderDetailByID);
  router.post(
    "/order_detail/add",

    orderDetailController.handleAddNewOrderDetail
  );

  router.get("/medicine", checkAdminJwt, medicineController.handleAllMedicine);
  router.get(
    "/medicine/search/:searchTerm",
    checkAdminJwt,
    medicineController.handleSearchMedicine
  );
  router.get("/disease", checkAdminJwt, diseaseController.handleAllDisease);
  router.get(
    "/disease/search/:searchTerm",
    checkAdminJwt,
    diseaseController.handleSearchDisease
  );
  router.get("/purpose", checkAdminJwt, purposeController.handleAllPurpose);
  router.get("/order/:id", checkAdminJwt, orderController.handleAllOrderByID);
  router.post("/order/add", checkAdminJwt, orderController.handleAddOrder);
  router.get(
    "/order_detail/:id",
    checkAdminJwt,
    orderDetailController.handleOrderDetailByID
  );
  router.post(
    "/order_detail/add",
    checkAdminJwt,
    orderDetailController.handleAddNewOrderDetail
  );

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
