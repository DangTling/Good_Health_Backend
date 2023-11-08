require("dotenv").config();

const configCors = (app) => {
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });
};

export default configCors;

// import cors from "cors";

// const configCors = (app) => {
//   app.use(
//     cors({
//       origin: "*", // Cho phép truy cập từ bất kỳ nguồn nào
//       methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
//       allowedHeaders: "X-Requested-With,content-type",
//       credentials: true,
//     })
//   );
// };

// export default configCors;
