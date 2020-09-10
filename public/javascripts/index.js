// для кнопки Order Now 

let scroll = document.getElementById('scroll');
let btn = document.querySelector('.btn');

function btnScroll() {
  scroll.scrollIntoView({
    behavior: 'smooth'
  })
}

btn.addEventListener('click', btnScroll);


// для всплывающего окна по нажатию на кнопку + Add

