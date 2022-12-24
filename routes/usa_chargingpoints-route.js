// express router
const express = require("express");
const loginController = require("../controllers/login-controller");
const {
  createChargingPoint,
  getAllChargingPoints,
  getChargingPoint,
  updateChargingPoint,
  deleteChargingPoint,
} = require("../controllers/usa_chargingpoints.-controller");

const router = express.Router();
// models
const db = require("../models");
const { sendErrorResp } = require("../utils/common-utils");

router.post("/", async (req, res) => {
  createChargingPoint(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/", async (req, res) => {
  getAllChargingPoints()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/:id", async (req, res) => {
  getChargingPoint(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.patch("/:id", async (req, res) => {
  updateChargingPoint(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:id", async (req, res) => {
  deleteChargingPoint(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
