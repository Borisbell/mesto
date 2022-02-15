// const formSubmit = (evt, form) => {
//   evt.preventDefault();

//   if (form.checkValidity()) {
//     form.reset();
//   }
// }

const setInputValid = (errorMessage, input) => {
  errorMessage.textContent = '';
  input.classList.remove('popup__input_type_error');
}

const setInputInvalid = (errorMessage, input) => {
  errorMessage.textContent = input.validationMessage;
  input.classList.add('popup__input_type_error');
}

const checkInputValidity = (form, input) => {
  const errorMessage = form.querySelector(`#error-${input.id}`);
  if (input.validity.valid) {
    setInputValid(errorMessage, input);
  } else {
    setInputInvalid(errorMessage, input);
  }
}

const disableButton = (button) => {
  button.setAttribute('disabled', '');
  button.classList.add('popup__submit_disabled');
}

const checkButtonValidity = (form, button) => {
  if (form.checkValidity()) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__submit_disabled');
  } else {
    disableButton(button);
  }
}

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((input) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !input.validity.valid;
  })
};

const toggleButtonState = (inputList, button) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    button.setAttribute('disabled', '');
    button.classList.add('popup__submit_disabled');
  } else {
    // иначе сделай кнопку активной
    button.removeAttribute('disabled');
    button.classList.remove('popup__submit_disabled');
  }
};

const setEventListeners = (form) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__submit');
  // Обойдём все элементы полученной коллекции
  inputList.forEach((input) => {
    // каждому полю добавим обработчик события input
    input.addEventListener('input', () => {
      // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(form, input);
      toggleButtonState(inputList, button);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(form);
  })
}

enableValidation();
