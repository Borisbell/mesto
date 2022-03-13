export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._button = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _setInputInvalid(errorElement, input, errorMessage) {
    errorElement.textContent = errorMessage;
    input.classList.add(this._settings.inputErrorClass);
  }

  _setInputValid(errorElement, input) {
    errorElement.textContent = '';
    input.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    const errorMessage = input.validationMessage;
    if (input.validity.valid) {
      this._setInputValid(errorElement, input);
    } else {
      this._setInputInvalid(errorElement, input, errorMessage);
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

  _enableButton() {
    this._button.removeAttribute('disabled');
    this._button.classList.remove(this._settings.inactiveButtonClass);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
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
