// express router
const express = require("express");
const loginController = require("../controllers/login-controller");
const {
  createRouteAddress,
      getAllRoutesAdresses,
       getRouteAdress, updateRouteAdress,
        deleteRouteAddress } = require("../controllers/tbl_routes_address-controller");
const router = express.Router();
// models
const db = require("../models");
const { sendErrorResp } = require("../utils/common-utils");

router.post("/", async (req, res) => {
  createRouteAddress(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});


router.get("/", async (req, res) => {
  getAllRoutesAdresses()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});
router.get("/:id", async (req, res) => {
  getRouteAdress(req.params.id)
  .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.patch("/:id", async (req, res) => {
  updateRouteAdress(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:id", async (req, res) => {
  deleteRouteAddress(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
