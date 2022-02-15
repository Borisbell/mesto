const setInputValid = (config, errorMessage, input) => {
  errorMessage.textContent = '';
  input.classList.remove(config.inputErrorClass);
}

const setInputInvalid = (config, errorMessage, input) => {
  errorMessage.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

const checkInputValidity = (config, form, input) => {
  const errorMessage = form.querySelector(`#error-${input.id}`);
  if (input.validity.valid) {
    setInputValid(config, errorMessage, input);
  } else {
    setInputInvalid(config, errorMessage, input);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

const toggleButtonState = (config, inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.removeAttribute('disabled');
    button.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (config, form) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(config, form, input);
      toggleButtonState(config, inputList, button);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(config, form);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
});
