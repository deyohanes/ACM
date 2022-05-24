import express from 'express'
const router = express.Router();
 
import {getWarehouse,
  setWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseById} from "../controllers/warehouseController.js";

//router.route('/').get(getCommodity).post(setCommodity)
//router.route('/:id').delete(deleteCommodity).put(updateCommudity)
//router.route('/:id').get(getCommodityByid)
router.get("/", getWarehouse );
router.get("/:id", getWarehouseById);
router.post("/", setWarehouse);
router.put("/:id", updateWarehouse);
router.delete("/:id", deleteWarehouse);  

export default router;
