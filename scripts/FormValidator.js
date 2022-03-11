export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._button = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _setInputInvalid(errorMessage, input) {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(this._settings.inputErrorClass);
  }

  _setInputValid(errorMessage, input) {
    errorMessage.textContent = '';
    input.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(input) {
    const errorMessage = this._form.querySelector(`#error-${input.id}`);

    if (input.validity.valid) {
      this._setInputValid(errorMessage, input);
    } else {
      this._setInputInvalid(errorMessage, input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  };

  _disableButton() {
    this._button.setAttribute('disabled', '');
    this._button.classList.add(this._settings.inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._settings.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners();
    };
}
