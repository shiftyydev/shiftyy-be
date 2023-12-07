const { Op } = require("sequelize");
const { tbl_route_addresses,users,tbl_routes } = require("../models");
const log = require("../utils/logger");

const createRouteAddress = async (body) => {
  
  try {
    if(body.length == 0){
      return{
        status: 400,
        message: "No route address found",
      }
    }
    // find tbl_route_addresses by route_id
    let routeAddress = await tbl_route_addresses.findAll({
      where: { route_id: body[0].route_id },
    })

    if(routeAddress.length > 0){
      // delete all route addresses
      await tbl_route_addresses.destroy({
        where: { route_id: body[0].route_id },
      })
    }
    // create new route addresses

    let createdRouteAddress = await tbl_route_addresses.bulkCreate(body);
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

const getAllRoutesAddresses = async (user) => {

  let routeIds = [];

  if(user.userType == "manager"){
    let companyAdmin = await users.findOne({
      where : {
        id : user.id
      }
    });
    if(!companyAdmin) return {
      status: 400,
      message: "No routes found",
    };
    if(companyAdmin.dataValues.childOf){
      user.id = companyAdmin.dataValues.childOf;
    }
    let companyRoutes = await tbl_routes.findAll({
      where : {
        user_id : user.id
      }
    });
    companyRoutes.forEach(route => {
      routeIds.push(route.dataValues.id);
    });
  }


  try {
    let routeAddresses = await tbl_route_addresses.findAll({
      // where addresss does not include undefined word in string
      where: {
        complete_address: {
          [Op.notLike]: "%undefined%",
        },
        [user.userType == "manager" ? 'route_id' : 'geom']: user.userType == "manager" ? {
          [Op.in] : routeIds
        } : null
      },
    });

    if (!routeAddresses) {
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
    let routeAddress = await tbl_route_addresses.findAll({
      where: { route_id: id },
    });
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
