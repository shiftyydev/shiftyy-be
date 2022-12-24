// express router
const express = require("express");
const {
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
  getVehicle,
  createVehicle,
  getVehiclesInfo
} = require("../controllers/vehicle-controller");
const router = express.Router();
// models
const db = require("../models");
const { sendErrorResp } = require("../utils/common-utils");

router.post("/", async (req, res) => {
  createVehicle(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/", async (req, res) => {
  getAllVehicles(req.query.page,JSON.parse(req.query.sortBy),req.query.showing)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});


router.get("/info", async (req, res) => {
  getVehiclesInfo()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.patch("/:id", async (req, res) => {
  updateVehicle(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:id", async (req, res) => {
  deleteVehicle(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
