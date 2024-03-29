const { tbl_routes, tbl_route_addresses, users } = require('../models');
const log = require('../utils/logger');
const { Op } = require('sequelize');
const createRoute = async (body, userid) => {
  try {
    console.log('body : ', body);
    let route = await tbl_routes.create({
      ...body,
      user_id: userid,
    });
    return {
      status: 200,
      message: 'Route created successfully',
      route: route,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const getAllRoutes = async (
  page = 0,
  sortBy = [['id', 'DESC']],
  showing = 10,
  user
) => {
  if (user.userType == 'manager') {
    let companyAdmin = await users.findOne({
      where: {
        id: user.id,
      },
    });
    if (!companyAdmin)
      return {
        status: 400,
        message: 'No routes found',
      };
    if (companyAdmin.dataValues.childOf) {
      user.id = companyAdmin.dataValues.childOf;
    }
  }

  try {
    let routes = await tbl_routes.findAll({
      limit: showing,
      offset: page * showing,
      order: sortBy,
      where: {
        [user.userType == 'manager' ? 'user_id' : 'creator_id']:
          user.userType == 'manager' ? user.id : null,
      },
      include: [
        {
          model: tbl_route_addresses,
          as: 'addresses',
        },
      ],
    });

    routes.forEach(async (route) => {
      if (route.dataValues.assignedTo) {
        let user = await users.findOne({
          where: {
            id: route.dataValues.assignedTo,
          },
        });
        if (user) route.dataValues.driver = user.dataValues;
      }
    });

    if (!routes) {
      return {
        status: 400,
        message: 'No routes found',
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
      message: 'Something went wrong',
    };
  }
};

const getAllRoutesWithAddresses = async (user) => {
  try {
    let routes = await tbl_routes.findAll({
      include: [
        {
          model: tbl_route_addresses,
          as: 'addresses',
        },
      ],
      where: {
        [user.isAdmin ? 'id' : user_id]: user.isAdmin
          ? {
              [Op.gt]: -1,
            }
          : user.id,
      },
    });

    if (!routes) {
      return {
        status: 400,
        message: 'No routes found',
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
      message: 'Something went wrong',
    };
  }
};

const getRoutesInfo = async (userid) => {
  try {
    // return total routes count
    let route = await tbl_routes.count({
      where: {
        user_id: userid,
      },
    });
    if (!route) {
      return {
        status: 400,
        message: 'No route found',
      };
    } else {
      return {
        status: 200,
        message: 'Route found',
        page: Math.ceil(route / 10),
        count: route,
      };
    }
  } catch (error) {
    log.info(error);
  }
};

const updateRoute = async (routeId, body) => {
  try {
    let updatedRoute = await tbl_routes.update(body, {
      where: { id: routeId },
      returning: true,
    });
    if (body.assignedTo) {
      await tbl_route_addresses.update(
        {
          status: 'pending',
        },
        {
          where: {
            route_id: routeId,
          },
        }
      );
    }
    return {
      status: 200,
      message: 'Route updated successfully',
      updateRoute: updatedRoute[1],
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'something went wrong',
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
        message: 'Route not found',
      };
    }
    return {
      status: 200,
      message: 'Route deleted successfully',
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'something went wrong',
    };
  }
};

module.exports = {
  createRoute,
  getAllRoutes,
  getAllRoutesWithAddresses,
  getRoutesInfo,
  updateRoute,
  deleteRoute,
};
