const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new mongoose.Schema(
  {
    id_schedule: String,
    id_corporate: String,
    owner: String,
    handled_by: Number,
    id_driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    id_vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    handled_by_subcontractor: String, //id of subcontractor
    id_visitor: { type: Schema.Types.ObjectId, ref: 'Visitor' },
    vehicle_type: String,
    passengers_number: Number,
    luggage_details: String,
    journey_type: String,
    notes: String,
    heard_of_us: String,
    pushed_price: String,
    id_invoice: String,
    paid_by_client: Boolean,
    paid_by_bouden: Boolean,
    status: String,
    progress: String,
    balance: String,
    deposit: String,
    manual_cost: String,
    automatic_cost: String,
    start_point: {
      placeName: String,
      coordinates: {
        lat: Number,
        lon: Number
      }
    },
    estimated_start_time: String,
    real_start_time: String,
    start_delay_time: String,
    mid_stations: Array, /// Array of objects {id_stop , time (up/down), qr_code}
    delays: Array, /// Array of objects {id_delay startTime , cause ...}
    change_route: {
      time: String,
      position: {
        placeName: String,
        coordinates: {
          lat: Number,
          lon: Number
        }
      },
      cause: String,
      delay: String
    },
    estimated_end_time: String,
    destination_point: {
      placeName: String,
      coordinates: {
        lat: Number,
        lon: Number
      }
    },
    type: String, // One way or return
    estimated_return_start_time: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", quoteSchema);
