const {Router} = require('express')
const router = Router()
const moment = require('moment')
const Order = require('../app/models/orders')


router.post('/', (req, res) => {
  const {phone, address} = req.body
  if(!phone || !address) {
    req.flash('error', 'All fields are required')
    return res.redirect('/cart')
  }

  const order = new Order({
    customerId: req.user._id,
    items: req.session.cart.items,
    phone,
    address
  })

  order.save().then(result => {
    req.flash('success', 'Order placed successfully')
    delete req.session.cart
    return res.redirect('/orders')
  }).catch(err => {
    req.flash('error', 'Something went wrong')
    return res.redirect('/')
  })
})

router.get('/', async (req, res) => {
  const orders = await Order.find({ customerId: req.user._id}, 
    null, {sort: {'createdAt': -1 } } )

  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')

  res.render('orders', {
    title: 'Customer orders',
    orders: orders,
    moment: moment
  })
})

module.exports = router