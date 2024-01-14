// express router
const express = require("express");
const router = express.Router();
const log = require("../utils/logger");
const jwt = require("jsonwebtoken");
const tblRoutes_Routes = require("./tbl_routes-routes");
const vehicleRoutes = require("./vehicles-routes");
const chargingStationRoutes = require("./chargingstation-routes");
const userRoutes = require("./user-routes");
const equipmentRoutes = require("./equipment-routes");
const tblRoutesAddress_Routes = require("./tbl_routes_address-routes");
const usaChargingPointRoutes = require("./usa_chargingpoints-route");
const { isLoggedIn, blacklist } = require("../middleware/isLoggedIn");
const { userLogin, createUser, signUp } = require("../controllers/user-controller");

router.get("/auth", (req, res) => {
  // if user is logged in, send user data
  if (req.user) {
    res.json(req.user);
  } else {
    // if user is not logged in, send false
    res.json(false);
  }
});

router.post("/login", (req, res) => {
  userLogin(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      log.info(error);
      res.send(error);
    });
});
router.post("/logout", isLoggedIn, async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token || token == "undefined")
      res.status(401).send("Unauthorize user");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(403).send("Unauthorized user");
    }
    blacklist.add(token);
    res.status(200).send("Logout Successfully");
  } catch (error) {
    log.info(error);
    res.send(error);
  }
});

router.get("/is-logged-in", isLoggedIn, (req, res) => {
  const token = req.headers["authorization"];
  if (!token || token == "undefined") res.status(401).json("Unauthorize user");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(403).send("Unauthorized user");
    }

  
    
    const obj = {
      firstName:  decoded?.name,
      lastName:  decoded?.name,
      email:  decoded?.email,
      token,
    };
    res.status(200).send(obj);
  } catch (error) {
    log.info(error);
    res.status(500).json("Something went wrong");
  }
});
router.post("/register", (req, res) => {
  createUser(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      log.info(error);
    });
});

// user Registeration
router.post("/signUp", async (req, res) => {
  signUp(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch ((error)=> {
      sendErrorResp(error, req, res);
  })
});

router.use("/routes", isLoggedIn, tblRoutes_Routes);
router.use("/vehicles", isLoggedIn, vehicleRoutes);
router.use("/charging-stations", isLoggedIn, chargingStationRoutes);
router.use("/users", isLoggedIn, userRoutes);
router.use("/equipments", isLoggedIn, equipmentRoutes);
router.use("/routes-address", isLoggedIn, tblRoutesAddress_Routes);
router.use("/charging-point", isLoggedIn, usaChargingPointRoutes);
router.use("/companies", isLoggedIn, require("./companies-routes"));
// const setup = (app) => { 
//   if (app) {
//     log.info("Setting up index...");
//     index(app);
//   } else {
//     log.error("Undefined app provided for index");
//   }
// };

// const index = (app) => {
//   app.use(function (req, res, next) {
//     log.info(req.method, req.url);
//     next();
//   });
//   app.use("/routes", tblRoutes_Routes());
// };

module.exports = router;
