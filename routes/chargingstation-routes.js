// express router
const express = require("express");
const loginController = require("../controllers/login-controller");
const {
    createChargingStation,
    getAllChargingStations,
    getChargingStation,
    updateChargingStation,
    deleteChargingStation,
    getAllChargingStationsTotalPages,
    getDistinctChargingStationCountries,
} = require('../controllers/chargingstations-controller')
const router = express.Router();
// models
const db = require("../models");
const { sendErrorResp } = require("../utils/common-utils");
const { getDistinctEquipments } = require("../controllers/equipments-controller");
const { getDistinctVehicles } = require("../controllers/vehicle-controller");

router.post("/", async (req, res) => {
  createChargingStation(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});


router.get("/", async (req, res) => {
  getAllChargingStations(req.query.page)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/pages", async (req, res) => {
  getAllChargingStationsTotalPages()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/distinct", async (req, res) => {
 const reqs =  [getDistinctChargingStationCountries(),getDistinctEquipments(),getDistinctVehicles()]
  Promise.all(reqs)
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});




router.patch("/:id", async (req, res) => {
  updateChargingStation(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:id", async (req, res) => {
  deleteChargingStation(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
