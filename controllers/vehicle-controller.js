const { vehicles } = require("../models");

const createVehicle = (req, res) => {
  vehicles.create(req.body).then((newVehicle) => {
    res.json(newVehicle);
  });
};

const getAllVehicles = async () => {
  try {
    let vehicle = await vehicles.findAll();

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

const getVehicle = (req, res) => {
  vehicle.findByPk(req.params.id).then((vehicle) => {
    res.json(vehicle);
  });
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
      message: "something went wrong",
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
      message: "something went wrong",
    };
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
