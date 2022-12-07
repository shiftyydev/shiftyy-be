const { tbl_routes } = require("../models");
const log = require("../utils/logger");

const createRoute = (req, res) => {
  try {
  } catch (error) {}
  tbl_routes.create(req.body).then((newEquipment) => {
    res.json(newEquipment);
  });
};

const getAllRoutes = async () => {
  try {
    let routes = await tbl_routes.findAll();

    if (!routes) {
      return {
        status: 400,
        message: "No routes found",
      };
    } else {
      return {
        status: 200,
        routes: routes,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const getRoute = (req, res) => {
  try {
  } catch (error) {}
  tbl_routes.findByPk(req.params.id).then((tbl_routes) => {
    res.json(equipment);
  });
};

const updateRoute = async (routeId, body) => {
  try {
    let updatedRoute = await tbl_routes.update(body, {
      where: { id: routeId },
      returning: true,
    });
    return {
      status: 200,
      message: "Route updated successfully",
      updateRoute: updatedRoute[1],
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "something went wrong",
    };
  }
};

const deleteRoute = async (routeId) => {
  try {
    let deletedRoute = await tbl_routes.destroy({
      where: { id: routeId },
    });

    if (deletedRoute == 0) {
      return {
        status: 400,
        message: "Route not found",
      };
    }
    return {
      status: 200,
      message: "Route deleted successfully",
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "something went wrong",
    };
  }
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
};
