// express router
const express = require('express');
const loginController = require('../controllers/login-controller');
const {
  createUser,
  getAllUsers,
  getUsersInfo,
  updateUser,
  deleteUser,
  userLogin,
  getAllDrivers,
  getUserById,
} = require('../controllers/user-controller');
const router = express.Router();
// models
const db = require('../models');
const { sendErrorResp } = require('../utils/common-utils');

router.post('/', async (req, res) => {
  createUser(req.body, req.user)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.post('/login', async (req, res) => {
  userLogin(req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get('/', async (req, res) => {
  getAllUsers(
    req.query.page,
    JSON.parse(req.query.sortBy),
    req.query.showing,
    req.user,
    req.query.company
  )
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});
router.get('/drivers', async (req, res) => {
  getAllDrivers(req.user)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});
router.get('/info', async (req, res) => {
  getUsersInfo()
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.patch('/', async (req, res) => {
  updateUser(req.user.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete('/:id', async (req, res) => {
  deleteUser(req.params.id, req.user)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});
router.get('/user-info', async (req, res) => {
  getUserById(req.user.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

module.exports = router;
