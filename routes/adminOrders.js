const {Router} = require('express')
const router = Router()
const Order = require('../app/models/orders')
const moment = require('moment')

router.get('/', async (req, res) => {
  const orders = await Order.find({ status: { $ne: 'completed'}},
  null, { sort: {'createdAt': -1 }}).populate('customerId', '-password')

  res.render('adminRoutes', {
    title: 'Admin orders',
    orders: orders,
    moment: moment
  })
})

router.post('/', async (req, res) => {
  await Order.updateOne({_id: req.body.orderId}, {$set:{status: req.body.status}}, err => {
    if(err) {
      console.log(err)
      return res.redirect('/admin-orders')
    }
    return res.redirect('/admin-orders')
  })
})

module.exports = router