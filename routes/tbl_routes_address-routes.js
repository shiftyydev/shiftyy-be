// express router
const express = require("express");
const loginController = require("../controllers/login-controller");
const {
  createRouteAddress,
  getAllRoutesAddresses,
  getRouteAddress, updateRouteAddress,
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
  getAllRoutesAddresses(req.user)
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

router.post("/updateAddressPointStatus", async (req, res) => {
  try {
    let addressPoint = await db.tbl_route_addresses.findOne({
      where: { id: req.body.id },
    });
    if (!addressPoint) {
      return res.status(400).send("Address point not found");
    }
    addressPoint.status = req.body.status;
    await db.tbl_route_addresses.update({
      status: req.body.status,
    }, {
      where: { id: req.body.id },
    })
    return res.status(200).send("Address point status updated successfully");
  }
  catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
})

module.exports = router;
