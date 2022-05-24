import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
  warehouseSymbol: {
    type: [String],
    required: true,
  },
  block: {
    type: [String],
    required: true,
  },
  rack: {
    type: [String],
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});
const warehouse = new mongoose.model("warehouses", warehouseSchema);
export default warehouse;