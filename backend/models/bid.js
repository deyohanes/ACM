import mongoose from "mongoose";
const bidSchema = mongoose.Schema({
 producerId: {
    type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Producer',
 },
 baseprice:{
   type :number,
   required: true,
 } ,
 amount: {
   type :number,
   required : true
 },
 isLive: {
    type: Boolean,
    required: true,
    default: false,
  },
  
},{
 timeStamp : true,
});
const bid = mongoose.model("bids", bidSchema);
export default bid;