// express router
const express = require("express");
const loginController = require("../controllers/login-controller");
const {
  getAllRoutes,
  updateRoute,
  deleteRoute,
} = require("../controllers/tbl_routes-controller");
const router = express.Router();
// models
const db = require("../models");
const { sendErrorResp } = require("../utils/common-utils");

router.get("/", async (req, res) => {
  getAllRoutes()
    .then((result) =>
      res.status(result.status).send((result) => {
        if (result.status !== 200) {
          sendErrorResp(result, req, res);
          return;
        }
      })
    )
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.patch("/:id", async (req, res) => {
  update(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete("/:id", async (req, res) => {
  deleteRoute(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
