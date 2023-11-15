import userService from "../service/userService";

const handleRegister = async (req, res) => {
  try {
    if (
      !req.body.name &&
      !req.body.email &&
      !req.body.address &&
      !req.body.phone_number &&
      !req.body.birth_of_date &&
      !req.body.gender &&
      !req.body.password &&
      !req.body.avatar
    ) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await userService.createNewUser(
      req.body.name,
      req.body.email,
      req.body.address,
      req.body.phone_number,
      req.body.birth_of_date,
      req.body.gender,
      req.body.password,
      req.body.avatar
    );
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleAllUser = async (req, res) => {
  if (req.query.page && req.query.limit) {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const data = await userService.getUsersByPage(page, limit);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      return res.status(500).json({
        EM: "Error from server",
        EC: "-1",
        DT: "",
      });
    }
  } else {
    try {
      let data = await userService.getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      return res.status(500).json({
        EM: "Error from server",
        EC: "-1",
        DT: "",
      });
    }
  }
};

const handleUserInfo = async (req, res) => {
  try {
    if (!req.params.email) {
      return res.status(200).json({
        EM: "Missing required params ",
        EC: 1,
        DT: "",
      });
    }

    let data = await userService.getUserInfo(req.params.email);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await userService.login(req.body.email, req.body.password);
    res.cookie("jwt", data.DT.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogout = (req, res) => {
  try {
    let token = null;
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
      res.clearCookie("jwt");
      return res.status(200).json({
        EM: "Log out successfully",
        EC: 1,
        DT: "",
      });
    } else {
      return res.status(403).json({
        EM: "Doen't exit user",
        EC: "-1",
        DT: "",
      });
    }
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await userService.deleteUser(req.params.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await userService.updateUser(
      req.params.id,
      req.body.name,
      req.body.email,
      req.body.address,
      req.body.phone_number,
      req.body.birth_of_date,
      req.body.gender,
      req.body.avatar
    );
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  handleRegister,
  handleAllUser,
  handleLogin,
  handleDeleteUser,
  handleUpdateUser,
  handleLogout,
  handleUserInfo,
};
