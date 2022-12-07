import {chargingstations} from '../models/chargingstations.js';
import {equipments} from '../models/equipments.js';

const createChargingStation = (req, res) => {
    chargingstations.create(req.body).then(newChargingStation => {
        res.json(newChargingStation);
    })
}

const getAllChargingStations = (req, res) => {
    chargingstations.findAll().then(chargingstations => {
        res.json(chargingstations);
    })
}

const getChargingStation = (req, res) => {
    chargingstations.findByPk(req.params.id).then(chargingstation => {
        res.json(chargingstation);
    })
}

const updateChargingStation = (req, res) => {
    chargingstations.update(req.body, {
        where: {id: req.params.id},
        returning: true
    }).then(updatedChargingStation => {
        res.json(updatedChargingStation);
    })
}

const deleteChargingStation = (req, res) => {
    chargingstations.destroy({
        where: {id: req.params.id}
    }).then(deletedChargingStation => {
        res.json(deletedChargingStation);
    })
}

module.exports = {
    createChargingStation,
    getAllChargingStations,
    getChargingStation,
    updateChargingStation,
    deleteChargingStation
}
