const { equipments } = require("../models");

const createEquipment = (req, res) => {
  equipments.create(req.body).then((newEquipment) => {
    res.json(newEquipment);
  });
};

const getAllEquipments = (req, res) => {
  equipments.findAll().then((equipments) => {
    res.json(equipments);
  });
};

const getEquipment = (req, res) => {
  equipments.findByPk(req.params.id).then((equipment) => {
    res.json(equipment);
  });
};

const updateEquipment = (req, res) => {
  equipments
    .update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    .then((updatedEquipment) => {
      res.json(updatedEquipment);
    });
};

const deleteEquipment = (req, res) => {
  equipments
    .destroy({
      where: { id: req.params.id },
    })
    .then((deletedEquipment) => {
      res.json(deletedEquipment);
    });
};

module.exports = {
  createEquipment,
  getAllEquipments,
  getEquipment,
  updateEquipment,
  deleteEquipment,
};
