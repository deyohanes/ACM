import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

 

const productsSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol : {
        type: String,
        required: true,
    },
     warehouseSymbol : {
        type: String,
        required: true,
    },
    image: {
      type: String,
      required: true,
    },
   
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    orgin: {
      type: String,
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
   
    grade : {
      type : Number,
      required : true
    },
    description : {
      type: String,
      required: true,
  },
  market : {
    type: String,
    required: true,
},
category : {
  type: String,
  required: true,
},
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productsSchema);

export default Products;
