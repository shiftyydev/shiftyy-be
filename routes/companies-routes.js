const express = require('express');
const router = express.Router();
const { sendErrorResp } = require('../utils/common-utils');

// Importing companies controller
const {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
  getCompaniesInfo,
  createCompanyWithManager,
  getCompanyByUserId,
} = require('../controllers/companies-controller');
const { upload } = require('../middleware/multer');

// Route to create a company
router.post('/', upload.single('Company Logo'), async (req, res) => {
  createCompanyWithManager(req.file, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// Route to get all companies with optional pagination
router.get('/all', async (req, res) => {
  getAllCompanies(req.query.page, req.query.sortBy, req.query.showing)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// Route to update a company
router.patch('/:id', upload.single('Company Logo'), async (req, res) => {
  updateCompany(req.params.id, req.body, req.file)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get('/', async (req, res) => {
  getCompanyByUserId(req.user.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

// Route to delete a company
router.delete('/:id', async (req, res) => {
  deleteCompany(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get('/info', async (req, res) => {
  getCompaniesInfo()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
