// для кнопки Order Now 

const scroll = document.getElementById('scroll');
const btn = document.querySelector('.btn');

function btnScroll() {
  scroll.scrollIntoView({
    behavior: 'smooth'
  })
}

btn.addEventListener('click', btnScroll);


// для всплывающего окна по нажатию на кнопку + Add

let addAnim = document.querySelectorAll('.addAnimation');

addAnim.forEach(elem => {
  elem.onclick = () => {
    document.getElementsByClassName('text-added')[0].style.right = '1.5vw';
    setTimeout("document.getElementsByClassName('text-added')[0].style.right = '-25vw'", 1500)
  }
});


// удаление оповощения в orders спустя X время

const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
  setTimeout(() => {
    alertMsg.remove()
  }, 2000)
}
