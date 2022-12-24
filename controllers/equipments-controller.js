const e = require("express");
const { emptyQuery } = require("pg-protocol/dist/messages");
const { equipments } = require("../models");
const log = require("../utils/logger");


const createEquipment =async (body) => {
  try{
  let createdEquipment = await equipments.create(body);
  return{
    status: 200,
    message: "Equipment created successfully",
    equipment: createdEquipment
  }
  }catch(error){
  log.info(error)
  return {
    status: 500,
    message: "Something went wrong",
  };
  }
};

const getAllEquipments =async (page) => {
try{
let equipment = await equipments.findAll({
  limit: 10000,
  offset: page || 1 * 10000,
  attributes: ['id','Latitude','Longitude','AddressLine1','AddressLine2','ContactEmail','Country','Usage','IsPayAtLocation','IsMembershipRequired','IsAccessKeyRequired','IsPrivateIndividual','Connection1_Type','Voltage','Amps','PowerKW']
});
if(!equipment){
  return{
    status: 200,
    message: "No equipment found"
  }
}else{
  return{
    status: 200,
    message: 'Equipments Found',
    equipments: equipment
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

const getAllEquipmentsTotalPages = async () => {
  try{
  let equipment = await equipments.count();
  if(!equipment){
    return{
      status: 200,
      message: "No equipment found"
    }
  }else{
    return{
      status: 200,
      message: 'Equipments Found',
      equipments: equipment,
      pageCount : Math.ceil(equipment/10000)
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

const getEquipment = async (id) => {
  try{
  const equipment = await equipments.findByPk(id)
  if(!equipment){
    return{
      status: 200,
      message: "No equipment Found",
    }
  }else{
    return{
      status: 200,
      message: "Equipment found",
      equipment: equipment
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

const updateEquipment =async (id,body) => {
 try{
 const updatedEquipment = await equipments.update(body,{
  where:{id: id}
 })
 return{
  status: 200,
  message: "Equipment updated successfully",
  equipment: updatedEquipment
 }
 }catch(error){
  log.info(error)
  return {
    status: 500,
    message: "Something went wrong",
  };
 }
};

const deleteEquipment =async (id) => {
  try{
const deletedEquipment = await equipments.destroy({where:{id:id}})

if (deletedEquipment == 0) {
  return {
    status: 400,
    message: "Equipment not found",
  };
}else{
return{
  status: 200,
  message: "Equipment deleted Successfully",
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

const getDistinctEquipments = async () => {
  try {
    let equipment = await equipments.findAll({
      attributes: ['Connection1_Type'],
      group: ['Connection1_Type']
    });

    if (!equipment) {
      return {
        status: 400,
        message: "No equipments found",
      };
    } else {
      return {
        status: 200,
        equipments: equipment,
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
  createEquipment,
  getAllEquipments,
  getEquipment,
  updateEquipment,
  deleteEquipment,
  getDistinctEquipments,
  getAllEquipmentsTotalPages
};
