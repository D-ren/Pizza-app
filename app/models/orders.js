const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {type: Object, required: true},
  phone: {type: String, required: true},
  address: {type: String, required: true},
  paymentType: {type: String, default: 'COD'},
  status: {type: String, default: 'order_placed'}
}, {timestamps: true})

module.exports = mongoose.model('Order', ordersSchema)