import asyncHandler from "express-async-handler";
import  bid  from "../models/auctionModel.js";
import Room from "../models/room.js";


// @desc    Create new bid
// @route   POST /api/bid
// @access  Private
 
const newAuction = asyncHandler(async (req, res) => {
  const {producerId,product, baseprice, duration,   amount } = req.body;
  if (duration === null || duration === 0) duration = 300;
  if (duration > 10800) duration = 3600;
   const timer = duration;
   try {
   let auction = new bid({
      producerId,
      baseprice,
      product,
      currentPrice: baseprice,
      duration,
      timer,
      amount,
  });

   //Create room for auction
  let room = new Room({ ad: auction._id });
    room = await room.save();


  auction.room = room._id;
  auction = await auction.save();

  res.status(201).json({auction ,room});
 } catch (err) {
  console.log(err);
  res.status(500).json({ errors: [{ msg: 'Server error' }] });
}
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
const {auctionId} = req.body
  try {
    let auction = await bid.findById(auctionId)
    if (!auction) return res.status(400).json({ errors: [{ msg: 'Ad not found' }] });
    if (!ad.isLive) return res.status(400).json({ errors: [{ msg: 'Auction hasnt started' }] });
    if (ad.isLive) return res.status(400).json({ errors: [{ msg: 'Already started' }] });
    auction.isLive = true
    auction.openAt = new Date();
    await auction.save();
    auction.timer = parseInt(auction.duration);
    //auction.auctionEnded = false;

  } catch (error) {}});
////////////////
////Close Biding
const closebid = asyncHandler(async (req, res) => {
  
  const auctionId = req.body
    try {
      let auction = await bid.findById(auctionId)
      if (!auction) return res.status(400).json({ errors: [{ msg: 'Auction not found' }] });
      if (!ad.isLive) return res.status(400).json({ errors: [{ msg: 'Auction already closed' }] });
      if (ad.isLive) return res.status(400).json({ errors: [{ msg: 'Auction Is steal Running' }] });
      auction.isLive = false
      auction.isEnd = true
      //auction.openAt = new Date();
      await auction.save();
      auction.timer = 0
      auction.duration =0
      //auction.auctionEnded = false;
  
    } catch (error) {}});

////s biding
//post
const placebid = asyncHandler(async (req, res) => {
  const { users, ad, bids } = req.body;
  const bb = parseInt(bids)
  let auction = await bid.findById(ad)
  const newd = auction.currentPrice
 // res.status(201).json(auction);
  if(newd){
    if (newd > bb) {
      res.status(201).json({message : "price too low"});
    } 
    if(newd === bb){
      res.status(201).json({message : "price too low"});
    }
    if(newd < bb){
     
     
      auction.currentPrice = bb
      auction.currentBidder = users
      await auction.save()
      res.status(201).json(auction);
    }


  }else {
  
    res.status(404).json({message : "No room found"});
  }
  
});
//////////////////////////
////update bid
const updatebid = asyncHandler(async (req, res,bidres,bidid) => {
  
  const auction = await bid.findById(bidid)
  if(auction){
    auction.bider.push(bidres)
    auction.numberOfbids =  auction.bider.length
    
  }
});


/////
export {
  getAuctionById,
  newAuction,
  getOwnAuction,
  getAuction,
  placebid,
  closebid,
  verifybid,updatebid
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
