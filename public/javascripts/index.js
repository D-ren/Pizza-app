// для кнопки Order Now 

let scroll = document.getElementById('scroll');
let btn = document.querySelector('.btn');

function btnClick() {
  scroll.scrollIntoView({
    behavior: 'smooth'
  })
}

btn.addEventListener('click', btnClick);