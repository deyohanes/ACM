import asyncHandler from "express-async-handler";
import { bid, bider } from "../models/bidModel.js";

// @desc    Create new bid
// @route   POST /api/bid
// @access  Private
const newAuction = asyncHandler(async (req, res) => {
  const { producerId, product, baseprice, amount, openAt, closeAt } = req.body;

  const auction = new bid({
    producerId,
    product,
    baseprice,
    amount,
    openAt,
    closeAt,
  });

  const createAuction = await auction.save();

  res.status(201).json(createAuction);
});
//get actions

const getAuctionById = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const auction = await bid.findById(id);
  res.json({ auction });
});

////getOwn actions
const getOwnAuction = asyncHandler(async (req, res) => {
  const { producerId } = req.body;

  const auction = await bid.find({ producerId });

  if (auction) {
    res.status(201).json(auction);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
///////
//all
const getAuction = asyncHandler(async (req, res) => {
  const bids = await bid.find({});
  res.json(bids);
});
////
//verify bid

const verifybid = asyncHandler(async (req, res) => {
  const { closeAt, id } = req.body;
  const auction = await bid.findById(id);

  if (auction) {
    auction.openAt = new Date();
    //auction.openAt = new ISODate()
    //auction.closeAt = openAt
    auction.closeAt = closeAt;
    auction.isLive = true;
    const verifiedAuction = await auction.save();

    res.json({ verifiedAuction });
  } else {
    res.status(404);
    throw new Error("this not found");
  }
});

////s biding
//post
const placebid = asyncHandler(async (req, res) => {
  const { id, auctionId, bid } = req.body;
  const biding = new bider({
    id,
    auctionId,
    bid,
  });

  const bidres = await biding.save();

  res.status(201).json(bidres);
});

export {
  getAuctionById,
  newAuction,
  getOwnAuction,
  getAuction,
  placebid,
  verifybid,
};
/////get verify post

/*
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});
*/
