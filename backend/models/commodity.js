 import mongoose from "mongoose";
 const commoditySchema = mongoose.Schema({
  commoditieName: {
    type :String,
    required: true,
  },
  symbol:{
    type :[String],
    required: true,
  },
  orgin:{
    type :[String],
    required: true,
  },
  market: {
    type: [String],
    required : true,
    defaut: ["Local", "Export","Both"],
  }
},{
  timeStamp : true,
});
const Commodity = mongoose.model("commodities", commoditySchema);
export default Commodity;