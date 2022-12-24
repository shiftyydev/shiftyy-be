// express router
const express = require("express");
const loginController = require("../controllers/login-controller");
const router = express.Router();
// models
const db = require("../models");
const { sendErrorResp } = require("../utils/common-utils");
const { createEquipment,
   getAllEquipments,
    getEquipment, 
    updateEquipment,
     deleteEquipment, 
     getAllEquipmentsTotalPages} = require("../controllers/equipments-controller");

router.post("/", async (req, res) => {
  createEquipment(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});


router.get("/", async (req, res) => {
  getAllEquipments(req.query.page)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/pages", async (req, res) => {
  getAllEquipmentsTotalPages()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});



router.patch("/:id", async (req, res) => {
  updateEquipment(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:id", async (req, res) => {
  deleteEquipment(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
