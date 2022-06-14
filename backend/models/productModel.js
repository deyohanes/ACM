import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
       
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    isPosted : {
      type : Boolean,
      required : true,
      default : false
    },
    currentPrice : {
      type :Number,
     required: true,
     default : 0
   },
   baseprice:{
    type :Number,
    required: true,
    default : 0
  } ,
  amount: {
    type :Number,
    required : true,
    default: 0,
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
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
