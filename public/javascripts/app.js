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

// change order status

let hiddenInput = document.querySelector('#hiddenInput')
let statuses = document.querySelectorAll('.stat')

let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)

function updateStatus(order) {
  let stepCompleted = true;

  statuses.forEach(curStatus => {
    let dataProp = curStatus.dataset.status;

    if(stepCompleted) {
      curStatus.classList.add('step-completed')
    }

    if(dataProp === order.status) {
      stepCompleted = false;
      if(curStatus.nextElementSibling) {
        curStatus.nextElementSibling.classList.add('current')
      }
    }
  })
}

updateStatus(order)