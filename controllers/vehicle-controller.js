const { vehicles } = require("../models");
const log = require("../utils/logger");

const createVehicle = async  (body,user) => {
 try{
  let vehicle = await vehicles.create({
    ...body,
    child_of: user.childOf || user.id,
  });
 return{
  status: 200,
  message: "Vehicle created Successfully",
  vehicle: vehicle
 }
 }catch(error){
  log.info(error)
  return {
    status: 500,
    message: "Something went wrong",
  };
 }
};

const getAllVehicles = async (page=1,sortBy=[['id',"ASC"]],showing=10,user) => {
  try {
    
    let vehicle = await vehicles.findAll({
      limit: showing,
      offset: page * showing,
      order: sortBy ,
     where : user.isAdmin ? {} : { child_of: user.childOf || user.id },
    });

    if (!vehicle) {
      return {
        status: 400,
        message: "No vehicles found",
      };
    } else {
      return {
        status: 200,
        vehicles: vehicle,
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

const getVehicle = async (id) => {
 try{
  let vehicle = await vehicles.findByPk(id);
  if (!vehicle) {
    return {
      status: 400,
      message: "No vehicles found",
    };
  } else {
    return {
      status: 200,
      message: "Vechicle Found",
      vehicle: vehicle,
    };
  }
 }catch(error){
  log.info(error)
  return {
    status: 500,
    message: "Something went wrong",
  };
 }
};



const getVehiclesInfo = async (user) => {
  try {
    let vehiclesCount = await vehicles.count({
      where: { child_of: user.childOf || user.id },
    });
    if (!vehiclesCount) {
      return {
        status: 200,
        message: "No vehicles found",
      };
    }
    else {
      return {
        status: 200,
        message: "Vehicles Found",
        count: vehiclesCount,
        page: Math.ceil(vehiclesCount / 10),
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


    

const updateVehicle = async (vehicleId, body) => {
  try {
    let updatedVehicle = await vehicles.update(body, {
      where: { id: vehicleId },
      returning: true,
    });
    return {
      status: 200,
      message: "Vehicle updated successfully",
      updateVehicle: updatedVehicle[1],
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const deleteVehicle = async (vehicleId) => {
  try {
    let deletedVehicle = await vehicles.destroy({
      where: { id: vehicleId },
    });

    if (deletedVehicle == 0) {
      return {
        status: 400,
        message: "Vehicle not found",
      };
    }
    return {
      status: 200,
      message: "Vehicle deleted successfully",
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const getDistinctVehicles = async (user) => {
  try {
    let vehicle = await vehicles.findAll({
      attributes: ["name"],
      group: ["name"],
      where : { child_of: user.childOf || user.id },
    });

    if (!vehicle) {
      return {
        status: 400,
        message: "No vehicles found",
      };
    } else {
      return {
        status: 200,
        vehicles: vehicle,
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


module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  getDistinctVehicles,
  getVehiclesInfo
};
