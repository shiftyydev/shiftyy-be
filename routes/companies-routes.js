const express = require("express");
const router = express.Router();
const { sendErrorResp } = require("../utils/common-utils");

// Importing companies controller
const {
  createCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  getCompaniesInfo,
  createCompanyWithManager
} = require("../controllers/companies-controller");

// Route to create a company
router.post("/", async (req, res) => {
  createCompanyWithManager(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// Route to get all companies with optional pagination
router.get("/", async (req, res) => {
  getAllCompanies(req.query.page,JSON.parse(req.query.sortBy),req.query.showing)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});


// Route to update a company
router.patch("/:id", async (req, res) => {
  updateCompany(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// Route to delete a company
router.delete("/:id", async (req, res) => {
  deleteCompany(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get("/info", async (req, res) => {
  getCompaniesInfo()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
