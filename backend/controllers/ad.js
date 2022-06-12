 import validationResult from "express-validator";
 import bid from "../models/auctionModel.js";
 import Room from "../models/room.js";
  
// @route   POST /ad
// @desc    Post a new ad
const addAd = async (req, res, next) => {
 

  let { producerId,product, baseprice, duration,   amount  } = req.body;
  if (duration === null || duration === 0) duration = 300;
  if (duration > 10800) duration = 3600;
   const timer = duration;

  try {
    let ad = new bid({
      producerId,
      baseprice,
      product,
      currentPrice: baseprice,
      duration,
      timer,
      amount,
    });

    // Create room for auction
    let room = new Room({ ad: ad._id });
      room = await room.save();

    ad.room = room._id;
    ad = await ad.save();

    res.status(200).json({ ad, room });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /ad
// @desc    Retrieve list of all ads
const retrieveAds = async (req, res, next) => {
 

  const { user, option } = req.query;
  let adList = [];
  try {
    if (user) {
      adList = await bid.find({ producerId: user }).sort({ createdAt: -1 });
    } else if (option === 'notexpired') {
      adList = await bid.find({ isLive: false }).sort({
        createdAt: -1,
      });
    } else {
      adList = await bid.find().sort({ createdAt: -1 });
    }
    res.status(200).json(adList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /ad/:id
// @desc    Find one ad
const findAd = async (req, res, next) => {
 
  const {user }= req.body; // id of type ObjectId (61a18153f926fdc2dd16d78b)
  try {
    const ad = await bid.findById(user)
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    res.status(200).json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   PUT /ad/:id
// @desc    Update an ad
const updateAd = async (req, res, next) => {
 

  const id = req.params.id;
  const _id = req.body;
const baseprice = req.body
const currentPrice = req.body


  try {
    // Check for authorization
    let ad = await bid.findById(id);
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.producerId !=  _id)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Unauthorized to delete this ad' }] });
    // Update all fields sent in body
    if (req.body.baseprice) {
      req.body.currentPrice = req.body.baseprice;
    }
    /*
    const data = {
      "baseprice" : baseprice,
      "currentPrice" : currentPrice
    }*/

    let updatedAd = await bid.findByIdAndUpdate(adId, req.body);
    updatedAd = await bid.findById(adId);

    res.status(200).json(updatedAd);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   DELETE /ad/:id
// @desc    Delete an ad
const deleteAd = async (req, res, next) => {
  const adId = req.params.id;
  try {
    let ad = await bid.findById(adId);
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner != req.user.id)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Unauthorized to delete this ad' }] });
    if (ad.auctionStarted || ad.auctionEnded)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Cannot delete, auction started/ended' }] });
    await bid.deleteOne(ad);
    res.status(200).json({ msg: 'Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
 export {addAd,deleteAd,updateAd,findAd,retrieveAds}