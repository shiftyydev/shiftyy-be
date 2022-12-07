// express router
const express = require("express");
const login = require("../controllers/login-controller");
const router = express.Router();
const log = require("../utils/logger");
const app = express();

// models
const db = require("../models");
const tblRoutes_Routes = require("./tbl_routes-routes");
const vehicleRoutes = require("./vehicles-routes");

// routes
router.get("/auth", (req, res) => {
  // if user is logged in, send user data
  if (req.user) {
    res.json(req.user);
  } else {
    // if user is not logged in, send false
    res.json(false);
  }
});

router.get("/login", login);

router.get("/users", (req, res) => {
  db.users.findAll().then((users) => {
    res.json(users);
  });
});

router.use("/routes", tblRoutes_Routes);
router.use("/vehicles", vehicleRoutes);
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
