import mongoose from "mongoose";

const biderModel = mongoose.Schema(

  {  id :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required  : true
  },
  auctionId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bidSchema',
    required  : true
  },
  bid : {
    type : Number,
  },
  isWon : {
    type : Boolean,
    required : true,
    default : false
  }},
  {
    timestamps: true,
  }
)

const bidSchema = mongoose.Schema({
 producerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
 },
 product:{
  type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Products',
 },
 currentPrice : {
    type :Number,
   required: true,
 },
 baseprice:{
   type :Number,
   required: true,
 } ,
 amount: {
   type :Number,
   required : true
 },
 timer: {
    type: Number,
    default: 300,
  },
 duration: {
    type: Number,
    default: 300,
  },
 isLive: {
    type: Boolean,
    required: true,
    default: false,
  },
  isEnd: {
    type: Boolean,
    required: true,
    default: false,
  },
  numberOfbids : {
    type : Number,
    required : true,
    default :0
  },

  openAt :{
   type : Date,
     
  },
  closeAt : { 
    type : Date
    
  },
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
   currentBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'room',
  },
  bids: [
    {
      user: {
        type: String,     
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
  
},{
 timeStamp : true,
});
const bid = mongoose.model("bidss", bidSchema);
const bider = mongoose.model("biders",biderModel)
//export  {bid,bider};
 export default  bid