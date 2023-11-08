import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./configs/connectDB";
import configCors from "./configs/cors";
import initApiRoutes from "./routes/api";
import cookieParser from "cookie-parser";

// import bodyParser from "body-parser";
require("dotenv").config();

const app = express();

configViewEngine(app);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

configCors(app);

// connection();

initWebRoutes(app);
initApiRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(">>> Search_medicine is running on port " + PORT);
});
