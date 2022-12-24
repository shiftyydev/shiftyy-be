const {chargingstations} = require( '../models');
const log = require("../utils/logger");


const createChargingStation = async (body) => {
   try{
   let createdChargingStation = await chargingstations.create(body);
   return{
    status: 200,
    message: "Charging station create successfully",
    station: createdChargingStation
   }
   }catch(error){
    log.info(error)
    return {
        status: 500,
        message: "Something went wrong",
      };
   }
}

const getAllChargingStations = async (page) => {
    try{
        let chargingStations = await chargingstations.findAll({
            limit: 10000,
            offset: page || 1 * 10000,
        });
       if(!chargingStations){
        return{
            status: 400,
            message: "No charging station found",
        }
       }else{
        return{
            status: 200,
            message: "Charging stations found",
            stations: chargingStations
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

const getAllChargingStationsTotalPages = async () => {
    try{
        let chargingStations = await chargingstations.count();
         if(!chargingStations){
            return{
                status: 400,
                message: "No charging station found",
            }
              }else{
                return{
                    status: 200,
                    message: "Charging stations found",
                    stations: chargingStations,
                    pageCount: Math.ceil(chargingStations / 10000)
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


const getChargingStation = async(id) => {
try{

    let chargingStation = await  chargingstations.findByPk(id);
    if(!chargingStation){
        return{
            status: 400,
            message: "No charging Station Found"
        }
    }else{
        return{
            status: 200,
            message: "Charging station found",
            station: chargingStation
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

const updateChargingStation = async(id,body) => {
 try{
const updatedChargingStation = await chargingstations.update(body,{
    where: {id: id},
    returning: true,
})
return{
    status: 200,
    message: `Station updated successfully`,
    station: updatedChargingStation
}
 }catch(error){
    log.info(error)
    return {
        status: 500,
        message: "Something went wrong",
      };
 }
}

const deleteChargingStation = async(id) => {
  try{
const deleteChargingStation = await chargingstations.destroy({where:{id:id}})
 if(deleteChargingStation == 0){
    return{
        status: 400,
        message: "No charging station Found"
    }
 }else{
    return{
        status: 200,
        message: "Charging station deleted successfully",
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

const getDistinctChargingStationCountries = async() => {
    try{
        let chargingStation = await chargingstations.findAll({
            attributes: ['Country'],
            group: ['Country']
        })
        if(!chargingStation){
            return{
                status: 400,
                message: "No charging station found"
            }
        }else{
            return{
                status: 200,
                message: "Charging station found",
                station: chargingStation
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


    module.exports ={
    createChargingStation,
    getAllChargingStations,
    getChargingStation,
    updateChargingStation,
    deleteChargingStation,
    getAllChargingStationsTotalPages,
    getDistinctChargingStationCountries
}
