import asyncHAndler from "express-async-handler";
import Warehouse from "../models/warehouseModel.js";

//--------------------------------------------------------------------------------------------------------------------------------------//
//@desc get commodities
//@route get/api/commodity
//@access private
const getWarehouse = asyncHAndler(async (req, res) => {
    const warehouse = await Warehouse.find();
    res.status(200).json(warehouse);
  });
//--------------------------------------------------------------------------------------------------------------------------------------//
//@desc get commodities by id
//@route get/api/commodity
//@access private
const getWarehouseById = asyncHAndler(async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//--------------------------------------------------------------------------------------------------------------------------------------//

//@desc setCommodities
//@route POST/api/commodity
//@access private
const setWarehouse = asyncHAndler(async (req, res) => {
  const warehouse = new Warehouse({
    warehouseSymbol: req.body.warehouseSymbol,
    block: req.body.block,
    rack: req.body.rack,
    size: req.body.size,
  });
  try {
    const dataToSave = await warehouse.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  //if (!req.body.productName || !req.body.symbol  || !req.body.grade  || !req.body.market ) {
  //res.status(400);
  //throw new Error("pls add text");}
  //const commodity = await Commodity.create({
  //productName: req.body.productName,
  //symbol: req.body.symbol,
  //grade: req.body.grade,
  //market: req.body.market,

  //});
  //res.status(200).json(commodity);
});
//--------------------------------------------------------------------------------------------------------------------------------------//
//@desc put Commodities
//@route PUT/api/commodity
//@access private
const updateWarehouse = asyncHAndler(async (req, res) => {
  const warehouse = await Warehouse.findById(req.params.id);
  if (!warehouse) {
    res.status(400);
    throw new Error("Commodity Not Found");
  }
  const updateProduct = await Warehouse.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateProduct);
});
//--------------------------------------------------------------------------------------------------------------------------------------//
//@desc delete commodities
//@route delete/api/commodity
//@access private
const deleteWarehouse = asyncHAndler(async (req, res) => {
  const warehouse = await Warehouse.findById(req.params.id);
  if (!warehouse) {
    res.status(400);
    throw new Error("Product Not Found");
  }
  await Warehouse.deleteOne();
  res.status(200).json({ id: req.params.id });
});


export  {
  getWarehouse,
  setWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseById,
};
