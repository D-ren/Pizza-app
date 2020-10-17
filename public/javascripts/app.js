let addToCart = document.querySelectorAll('.add-btn')
let cartCounter = document.querySelector('#cartCounter')

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