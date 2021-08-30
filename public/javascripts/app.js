const addToCart = document.querySelectorAll('.add-btn')
const cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
  axios.post('/update-cart', pizza).then((res) => {
    cartCounter.innerText = res.data.totalQty;
  })
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', () => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  })
})

//remove alert message 
const alertsMsg = document.querySelector('#success-alert')
if(alertsMsg) {
  setTimeout(() => {
    alertsMsg.remove()
  }, 2000)
}