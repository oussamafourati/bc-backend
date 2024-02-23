
const VehicleTypeService = require('../../services/vehicleTypeService');

const createVehicleType = async (req, res) => {
    try {
      const {type, base_change} = req.body;
       const newVehicleType = await VehicleTypeService.createVehicleType({type, base_change});
       res.status(201).json(newVehicleType);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };


  const updateVehicleType = async (req, res) => {
    try {
      const vehicleTypeId = req.params.id;
      const { type, base_change } = req.body;
  
      const updatedVehicleType = await VehicleTypeService.updateVehicleType(vehicleTypeId, {type, base_change });
  
      if (!updatedVehicleType) {
        return res.status(404).send('Vehicle Type not found');
      }
      res.json(updatedVehicleType);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };

  const deleteVehicleType = async (req, res) => {
    try {
      const VehicleTypeId = req.params.id;
  
      const deletedVehicleType = await VehicleTypeService.deleteVehicleType(VehicleTypeId);
  
      if (!deletedVehicleType) {
        return res.status(404).send('Vehicle Type not found');
      }
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };
  const getVehicleTypes = async (req, res) => {
    try {
      const VehicleTypes = await VehicleTypeService.getVehicleTypes();
      res.json( VehicleTypes );
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };

  module.exports = {
    deleteVehicleType,
    updateVehicleType,
    createVehicleType,
    getVehicleTypes
  };
  