import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    region : {
        type : Number,
        required : true,
    },
    ver : {
      type: String,
      required: true,
      unique: true,
    },
    cat : {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isReal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userssSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
