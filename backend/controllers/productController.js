import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Products from "../models/productsModel.js";
/////
import Room from "../models/room.js";
/////

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getOwnProducts = asyncHandler(async (req, res) => {
  const { user } = req.body;

  const product = await Products.find({ user });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
///////////////////////////////
////////////   \\\\\\\\\\\\\\\
///////////     \\\\\\\\\\\\\
//////////       ''''\\\\\\\\\\
/////////           //////////
////////          ///////////
///////           ''''\\\\\\
//////                 '''''
////new auction
////POST /api/products/auction
const newAuction = asyncHandler(async (req, res) => {
  const {data}  = req.body;
  const id = req.params.id
  const baseprice = data.baseprice
  const amount = data.amount
  res.json(data.baseprice)
   /*
  if (duration === null || duration === 0) duration = 300;
  if (duration > 10800) duration = 3600;
  //const timer = duration;
  */
 let bool = true
  try {
    const product = await Product.findById(id)
   //res.json(product );
    if(product){
      if(!product.isPosted){
        if(amount > product.countInStock){ res.status(201).json({message : "You Dont Have that much product"});}
          else{

           
            product.isPosted = bool
            product.amount = amount
            product.baseprice = baseprice
            product.currentPrice = baseprice
            await product.save();
            res.status(201).json(product);
          }
      } else {     
          res.status(201).json({message : "Auction already Posted"});
        }
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});
  /*
     let room = new Room({ ad: "62a536be038b71f2b253c2f3" });
    room = await room.save();
    const createAuction = await auction.save();

    product.room = room._id;
    product = await product.save();
      res.status(201).json(createAuction, room);
 
    res.json({product});  
   const auctions = new Product({
      producerId,
      baseprice,
      product,
      currentPrice: baseprice,
      duration,
      timer,
      amount,
    });*/
    //Create room for auction
     
    
  
//////////
//Get Auction By Id
//////    /api/products/auction/:id
const getAuctionById = asyncHandler(async (req, res) => {
  const  {id }= req.body;

  const product = await Product.findById(id)
  res.json(product );
});

 

//////// Get Own Auction
////   /api/auction/own
const getOwnAuction = asyncHandler(async (req, res) => {
  const { producerId } = req.body;

  const auction = await Product.find({ producerId });

  if (auction) {
    res.status(201).json(auction);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


//////////////Get all auctions
////// /api/products/auction/all

const getAuction = asyncHandler(async (req, res) => {
  const bids = await Product.find({});
  res.json(bids);
});

/////////////////Verify auction
//////  /api/products/auction/verify
const verifybid = asyncHandler(async (req, res) => {
  const  duration   = req.body;
  // const id = req.body
  //res.send(duration);
  
  //const duration = 450
  // //durations.duration
 
  if (duration === null || duration === 0) duration = 300;
  if (duration > 10800) duration = 3600;
  const timer = duration;
  const id = req.params.id
  const auction = await Product.find({id});
  res.json(auction);
  // if (auction) {
  //   if(auction.isPosted){ 
  //     auction.openAt = new Date();
  //     auction.timer = timer;
  //     auction.duration = duration;
  //     auction.isLive = true;
  //     await auction.save();
  //     res.json(auction);
  //   }
  //   res.json({ message : "Auction Not Posted" });
   
  // } else {
  //   res.status(404);
  //   throw new Error("Yehone Error");
  // }
});

/////////place bid
///   /api/products/auction/placebid

const placebid = asyncHandler(async (req, res) => {
  const data = req.body
 // const u = data.pid  
  // const id = data.id 
  // const userId = data.userId
  // const price =data.price

  
  const auction = await Product.findById(id);
  
   if (auction) 
      {
    if(auction.isLive){ 
    //  res.json({message :"Auction is Live"});
      if(auction.currentPrice < price){
        const bids ={
          user : userId,
          amount : price
        }
        auction.currentPrice = price;
        auction.numberOfbids++ 
        auction.currentBidder = userId
        auction.bids.push(bids)
        await auction.save(); 
        //const createAuction = await auction.save();
        res.json(auction);   
    }
      else{
        res.json({message : "Price too low"});
      }
     
    }
   else {
    res.json({ message : "Auction Not Started" });
   }
   
  } else {
    res.status(404);
    throw new Error("Auction not found");
  }    

});
 /*
   if (auction) 
      {
    if(auction.isLive){ 
    //  res.json({message :"Auction is Live"});
      if(auction.currentPrice < price){
        const bids ={
          user : userId,
          amount : price
        }
        auction.currentPrice = price;
        auction.numberOfbids ++ 
        auction.currentBidder = userId
        auction.bids.push(bids)
        await auction.save();
  
        let room = new Room({
          ad: id ,
          users :userId,
  
      });
      await room.save();
        //const createAuction = await auction.save();
        res.json(auction,room);   
    }
      else{
        res.json({message : "Price too low"});
      }
     
    }
   res.json({ message : "Auction Not Started" });
   
  } else {
    res.status(404);
    throw new Error("Auction not found");
  }   
});
*/
///////////////// update bid
////  /api/products/auction/update
const updatebid = asyncHandler(async (req, res, bidres, bidid) => {
  const auction = await Product.findById(bidid);
  if (auction) {
    auction.bider.push(bidres);
    auction.numberOfbids = auction.bider.length;
  }
});

const getfilter = asyncHandler(async (req, res) => {
  const {key,number} = req.body
  let products;
  switch (key) {
    case "all":
         products = await Product.find({}).sort({ rating: -1 }).limit(3);
      break;
    case "opened":
          products = await Product.find({$isLive : true}).sort({ rating: -1 }).limit(3);
      break;
    case "closed":
           products = await Product.find({$isClosed : true}).sort({ rating: -1 }).limit(3);
     break;
     
  }
  if(!products.length > 0 ){
    products = await Product.find({}).sort({ rating: -1 }).limit(3);
  }
res.json({products})
  res.json(products);
});

const closeAuction = asyncHandler(async (req, res) => {
  //const  { req.params.id }= req.body;

  const auction = await Product.findByIdAndUpdate(req.params.id)
  if(auction) {
    if(auction.isLive){
      auction.isPosted = false
      auction.isLive = false
      auction.isEnd = true
      await auction.save();
      res.json(auction);
    }
  }
  res.json(auction);
});
export {
  getProducts,
  getOwnProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getfilter,
  ///////auction
  newAuction,
  getAuctionById,
  getOwnAuction,
  getAuction,
  verifybid,
  placebid,
  updatebid,
  closeAuction
};
