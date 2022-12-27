// express router
const express = require("express");
const {
  getAllRoutes,
  updateRoute,
  deleteRoute,
  getRoutesInfo,
  createRoute,
  getAllRoutesWithAddresses
} = require("../controllers/tbl_routes-controller");
const router = express.Router();
// models
const db = require("../models");
const { sendErrorResp } = require("../utils/common-utils");

router.post("/", async (req, res) => {
  createRoute(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});


router.get("/", async (req, res) => {
  getAllRoutes(req.query.page,req.query.sortBy,req.query.showing)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get('/with-addresses', async (req, res) => {
  getAllRoutesWithAddresses()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/info", async (req, res) => {
  getRoutesInfo()
  .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.patch("/:id", async (req, res) => {
  updateRoute(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:id", async (req, res) => {
  deleteRoute(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
