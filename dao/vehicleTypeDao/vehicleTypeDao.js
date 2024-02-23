const VehicleType = require('../../models/vehicleModels/vehicleType');

const createVehicleType = async (VehicleTypeData) => {
  return await VehicleType.create(VehicleTypeData);
};
const updateVehicleType = async (id, updateData) => {
    return await VehicleType.findByIdAndUpdate(id, updateData, { new: true });
  };

  const deletedVehicleType= async (id) => {
    return await VehicleType.findByIdAndDelete(id);
  };

  const getVehicleTypes= async () => {
    return await VehicleType.find();
  };
module.exports = {
    createVehicleType,
    updateVehicleType,
    deletedVehicleType,
    getVehicleTypes
  };
  