const {Router} = require('express')
const router = Router()
const Order = require('../app/models/orders')

router.get('/', async (req, res) => {
  const order = await Order.findById(req.query.id)

  if(req.user._id.toString() === order.customerId.toString()) {
    res.render('singleOrder', {
      title: 'Order',
      order
    })
  } else {
    return res.redirect('/')
  }
})

module.exports = router