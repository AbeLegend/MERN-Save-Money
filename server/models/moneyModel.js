import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const moneySchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  money: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['plus', 'minus'],
    default: 'plus'
  }
}, { timestamps: true });

export default mongoose.model('Money', moneySchema);
