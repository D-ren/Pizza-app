document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const form = document.querySelector('form');
  let isValidate = false;
  let isValidate2 = false;
  let isValidate3 = false;

  const regExpName = /^[A-Za-z0-9]{4,16}$/;
  const regExpPassword = /^[A-Za-z0-9]{6,18}$/;
  const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

  const submit = () => {
    alert('Данные отправлены');
  }

  const validateElem = (elem) => {
    if (elem.name === 'username') {
      if (!regExpName.test(elem.value) && elem.value != '') {
        elem.nextElementSibling.textContent = 'Please enter a valid username!';
        if(elem.value.length < 4 || elem.value.length > 16) {
          elem.nextElementSibling.textContent = 'Please enter 4 to 16 characters';
        }
        isValidate = false;
      } else {
        elem.nextElementSibling.textContent = '';
        isValidate = true;
      }
    }
    if (elem.name === 'password') {
      if (!regExpPassword.test(elem.value) && elem.value != '') {
        elem.nextElementSibling.textContent = 'Enter correct password';
        if(elem.value.length < 6 || elem.value.length > 18) {
          elem.nextElementSibling.textContent = 'Password must be 6 to 18 characters'
        }
        isValidate2 = false;
      } else {
        elem.nextElementSibling.textContent = '';
        isValidate2 = true;
      }
    }
    if (elem.name === 'email') {
      if (!regExpEmail.test(elem.value) && elem.value != '') {
        elem.nextElementSibling.textContent = 'Enter correct email';
        isValidate3 = false;
      } else {
        elem.nextElementSibling.textContent = '';
        isValidate3 = true;
      }
    }
  }

  for(let elem of form.elements) {
    if (elem.tagName != 'BUTTON') {
      elem.addEventListener('blur', () => {
        validateElem(elem);
      })
    }
  }

  form.addEventListener('submit', (even) => {
    even.preventDefault();

    for(let elem of form.elements) {
      if (elem.tagName != 'BUTTON') {
        if(elem.value === '') {
          elem.nextElementSibling.textContent = 'This field is empty!';
        } else {
          elem.nextElementSibling.textContent = '';
        }
      }
    }
    if (isValidate === true && isValidate2 === true && isValidate3 === true) {
      submit();
      form.reset();
      isValidate = false;
    }
  })
})