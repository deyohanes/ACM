import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const producerSchema = mongoose.Schema(
  {
    name: {
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
    region:{
      type: String,
      required: true,
    }
     
  },
  {
    timestamps: true,
  }
)

producerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

producerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const producer = mongoose.model('Producers', producerSchema)

export default producer
