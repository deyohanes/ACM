 import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Types.ObjectId,
      ref: 'auctionModel',
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

 const Room = mongoose.model('room', roomSchema);
 export default  Room  
