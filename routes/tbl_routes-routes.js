// express router
const express = require('express');
const {
  getAllRoutes,
  updateRoute,
  deleteRoute,
  getRoutesInfo,
  createRoute,
  getAllRoutesWithAddresses,
} = require('../controllers/tbl_routes-controller');
const router = express.Router();
// models
const db = require('../models');
const { sendErrorResp } = require('../utils/common-utils');
const { upload } = require('../middleware/multer');

router.post('/', upload.any(), async (req, res) => {
  createRoute(req.body, req.user.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get('/', async (req, res) => {
  getAllRoutes(req.query.page, req.query.sortBy, req.query.showing, req.user)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get('/with-addresses', async (req, res) => {
  getAllRoutesWithAddresses(req.user)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.get('/info', async (req, res) => {
  getRoutesInfo(req.user.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.post('/:id', upload.any(), async (req, res) => {
  updateRoute(req.params.id, req.body)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.delete('/:id', async (req, res) => {
  deleteRoute(req.params.id)
    .then((result) => res.status(result.status).send(result))
    .catch((error) => {
      sendErrorResp(error, req, res);
    });
});

router.patch('/addRouteJSON', async (req, res) => {
  try {
    let route = await db.tbl_routes.update(
      {
        optimizedRoute: req.body.route,
      },
      {
        where: {
          id: req.body.routeId,
        },
      }
    );
    res.status(200).send(route);
  } catch (error) {
    sendErrorResp(error, req, res);
  }
});

router.get('/routeDriver/:routeId', async (req, res) => {
  try {
    let route = await db.tbl_routes.findOne({
      where: {
        id: req.params.routeId,
      },
    });
    let driver = await db.users.findOne({
      where: {
        id: route.assignedTo,
      },
    });
    res.status(200).send(driver);
  } catch (error) {
    sendErrorResp(error, req, res);
  }
});

router.get('/routeByDriver', async (req, res) => {
  const driverID = req.user.id;

  try {
    let route = await db.tbl_routes.findOne({
      where: {
        assignedTo: driverID,
      },
    });
    if (!route) {
      return {
        status: 404,
        message: 'Route not found',
      };
    }
    let routeAddresses = await db.tbl_route_addresses.findAll({
      where: {
        route_id: route.id,
        status: {
          [db.Sequelize.Op.or]: ['pending', 'in-progress'],
        },
      },
    });
    res.status(200).send({ routeAddresses, route });
  } catch (error) {
    sendErrorResp(error, req, res);
  }
});

module.exports = router;
