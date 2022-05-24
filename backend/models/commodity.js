 import mongoose from "mongoose";
 const commoditySchema = mongoose.Schema({
  commoditieName: {
    type :String,
    required: true,
  },
  symbol:{
    type :[String],
    required: true,
  } ,
  grade: {
    type :[String],
    required : true
  },
  market: {
    type: [String],
    required : true,
    defaut: ["Local", "Export"],
  }
},{
  timeStamp : true,
});
const Commodity = mongoose.model("commodities", commoditySchema);
export default Commodity;