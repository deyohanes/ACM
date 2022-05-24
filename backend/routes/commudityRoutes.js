import express from 'express'
const router = express.Router();

import {  getCommodity,
    setCommodity,
    updateCommudity,
    deleteCommodity,
    getCommodityByid} from "../controllers/commudityController.js";

//router.route('/').get(getCommodity).post(setCommodity)
//router.route('/:id').delete(deleteCommodity).put(updateCommudity)
//router.route('/:id').get(getCommodityByid)
router.get("/", getCommodity);
router.get("/:id", getCommodityByid);
router.post("/", setCommodity);
router.put("/:id", updateCommudity);
router.delete("/:id", deleteCommodity);

export default router;
