import adminService from "../service/adminService";

const handleLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    res.clearCookie("jwt");
    const data = await adminService.login(req.body.email, req.body.password);
    res.cookie("jwt_admin", data.DT.access_token, {
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
    if (req.cookies && req.cookies.jwt_admin) {
      token = req.cookies.jwt_admin;
      res.clearCookie("jwt_admin");
      return res.status(200).json({
        EM: "Log out successfully",
        EC: 1,
        DT: "",
      });
    } else {
      return res.status(403).json({
        EM: "Doen't exit admin",
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

const handleUpdateAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "0",
        DT: "",
      });
    }
    const data = await adminService.updateAdmin(
      req.params.id,
      req.body.name,
      req.body.email,
      req.body.password
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
  handleLogin,
  handleUpdateAdmin,
  handleLogout,
};
