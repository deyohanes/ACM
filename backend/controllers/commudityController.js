import asyncHAndler from "express-async-handler";
import Commodity from "../models/commodity.js";

//--------------------------------------------------------------------------------------------------------------------------------------//
//@desc get commodities
//@route get/api/commodity
//@access private
const getCommodity = asyncHAndler(async (req, res) => {
  const commodity = await Commodity.find();
  res.status(200).json(commodity);
});
//--------------------------------------------------------------------------------------------------------------------------------------//
//@desc get commodities by id
//@route get/api/commodity
//@access private
const getCommodityByid = asyncHAndler(async (req, res) => {
  try {
    const commodity = await Commodity.findById(req.params.id);
    res.json(commodity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//--------------------------------------------------------------------------------------------------------------------------------------//

//@desc setCommodities
//@route POST/api/commodity
//@access private
const setCommodity = asyncHAndler(async (req, res) => {
  const commodity = new Commodity({
    commoditieName: req.body.commoditieName,
    symbol: req.body.symbol,
    grade: req.body.grade,
    market: req.body.market,
  });
  try {
    const dataToSave = await commodity.save();
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
const updateCommudity = asyncHAndler(async (req, res) => {
  const commodity = await Commodity.findById(req.params.id);
  if (!commodity) {
    res.status(400);
    throw new Error("Commodity Not Found");
  }
  const updateProduct = await Commodity.findByIdAndUpdate(
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
const deleteCommodity = asyncHAndler(async (req, res) => {
  const commodity = await Commodity.findById(req.params.id);
  if (!commodity) {
    res.status(400);
    throw new Error("Product Not Found");
  }
  await Commodity.deleteOne();
  res.status(200).json({ id: req.params.id });
});

export  {
  getCommodity,
  setCommodity,
  updateCommudity,
  deleteCommodity,
  getCommodityByid,
};
