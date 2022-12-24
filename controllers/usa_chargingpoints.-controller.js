

const log = require("../utils/logger");
const { fromPairs } = require('lodash');
const { hashPassword } = require( '../middleware/isLoggedIn.js');
const {usa_charginpoints} = require('../models')


const createChargingPoint = async (body) => {
   try{
   let createdChargingPoint = await usa_charginpoints.create(body)
   return{
    status: 200,
    message: "Charging Point created successfully",
    chargingPoint: createdChargingPoint
   }
   }catch(error){
    log.info(error)
    return {
        status: 500,
        message: "Something went wrong",
      };
   }
}

const getAllChargingPoints = async () => {
    try{
        let chargingPoints = await usa_charginpoints.findAll()
       if(!chargingPoints){
        return{
            status: 400,
            message: "No User found",
        }
       }else{
        return{
            status: 200,
            message: "User found",
            chargingPoints: chargingPoints
        }
       }
    }catch(error){
        log.info(error)
        return {
            status: 500,
            message: "Something went wrong",
          };
    }
}
const getChargingPoint = async(id) => {
try{
    let chargingPoint = await usa_charginpoints.findByPk(id);
    if(!chargingPoint){
        return{
            status: 400,
            message: "No User Found"
        }
    }else{
        return{
            status: 200,
            message: "User found",
            chargingPoint: chargingPoint
        }
    }
}catch(error){
    log.info(error)
    return {
        status: 500,
        message: "Something went wrong",
      };
}
} 

const updateChargingPoint = async(id,body) => {
 try{
const updatedChargingPoint = await users.update(body,{
    where: {id: id},
    returning: true,
})
return{
    status: 200,
    message: `User updated successfully`,
    chargingPoint: updatedChargingPoint
}
 }catch(error){
    log.info(error)
    return {
        status: 500,
        message: "Something went wrong",
      };
 }
}

const deleteChargingPoint = async(id) => {
  try{
const deletedChargingPoint = await usa_charginpoints.destroy({where:{id:id}})
if (deletedChargingPoint == 0) {
    return {
      status: 400,
      message: "Vehicle not found",
    };
  }else{
return{
    status: 200,
    message: "User deleted successfully",
}
  }
  }catch(error){
    log.info(error)
    return {
        status: 500,
        message: "Something went wrong",
      };
  }
};

    module.exports ={
    createChargingPoint,
    getAllChargingPoints,
    getChargingPoint,
    updateChargingPoint,
    deleteChargingPoint,
}
