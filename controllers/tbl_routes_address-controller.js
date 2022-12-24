const { tbl_route_addresses } = require("../models");
const log = require("../utils/logger");

const createRouteAddress = async (body) => {
  try {
    let createdRouteAddress = await tbl_routes.create(body)
    return{
      status: 200,
      message: "Route Address created successfully",
      routeAddress: createdRouteAddress
    }
  } catch (error)
   {
    log.info(error)
    return {
        status: 500,
        message: "Something went wrong",
      };
   }
};

const getAllRoutesAddresses = async () => {
  try {
    let routeAddresses = await tbl_route_addresses.findAll();

    if (!routes) {
      return {
        status: 400,
        message: "No route address found",
      };
    } else {
      return {
        status: 200,
        routeAddress: routeAddresses,
      };
    }
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const getRouteAddress = async (id) => {
  try {
    let routeAddress = await tbl_route_addresses.findByPk(id)
    if(!route){
      return{
        status: 400,
        message: "No route address found"
      }
    }else{
      return{
        status: 200,
        message: "Route address found",
        routeAddress: routeAddress
      }
    }  
  } catch (error) {
 log.info(error)
 return {
    status: 500,
    message: "Something went wrong",
  };
  }
};

const updateRouteAddress = async (routeId, body) => {
  try {
    let updatedRouteAddress = await tbl_route_addresses.update(body, {
      where: { id: routeId },
      returning: true,
    });
    return {
      status: 200,
      message: "Route updated successfully",
      routeAddress: updatedRouteAddress[1],
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "something went wrong",
    };
  }
};

const deleteRouteAddress = async (routeId) => {
  try {
    let deletedRouteAddress = await tbl_route_addresses.destroy({
      where: { id: routeId },
    });
    if (deletedRouteAddress == 0) {
      return {
        status: 400,
        message: "Route Address not found",
      };
    }
    return {
      status: 200,
      message: "Route address deleted successfully",
    };
  } catch (error) {
    log.info(error);
    return {
        status: 500,
        message: "Something went wrong",
      };
  }
};

module.exports = {
  createRouteAddress,
  getAllRoutesAddresses,
  getRouteAddress,
  updateRouteAddress,
  deleteRouteAddress,
};
