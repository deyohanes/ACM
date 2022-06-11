import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
  warehouseSymbol: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  isFull: {
    type: Boolean,
    required: true,
    default : false,
    
  },
});
const warehouse = new mongoose.model("warehouses", warehouseSchema);
export default warehouse;