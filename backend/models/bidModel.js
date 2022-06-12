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
 baseprice:{
   type :Number,
   required: true,
 } ,
 amount: {
   type :Number,
   required : true
 },
 isLive: {
    type: Boolean,
    required: true,
    default: false,
  },
  numberOfbids : {
    type : Number,
    required : true,
    default :0
  },
  bider : [biderModel],
  openAt :{
   type : String,
     
  },
  closeAt : { 
    type : String
    
  }
  
},{
 timeStamp : true,
});
const bid = mongoose.model("bids", bidSchema);
const bider = mongoose.model("bider",biderModel)
export  {bid,bider};