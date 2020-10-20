const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

//SHOW ERROR OUTLINE AND ERROR
showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
};

//SHOW SUCCESS OUTLINE
showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

//CHECK EMAIL IS VALID
checkEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)) {
    showSuccess(email);
  } else {
    showError(email, 'Email is not valid');
  }
};

//CHECK INPUT LENGTH
checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)}  must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};

//CHECK PASSWORDS MATCH
checkPasswordsMatch = (password1, password2) => {
  if (password1.value !== password2.value) {
    showError(password2, 'Passwords do not match');
  }
};

//GET FIELD NAME
getFieldName = (input) => {
  const inputId = input.id;
  return inputId.charAt(0).toUpperCase() + inputId.slice(1);
};

//CHECK REQUIRED FIELDS
checkRequired = (inputArr) => {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

//EVENT LISTENERS
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
