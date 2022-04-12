import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit){
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('[type=Submit]');
    this._buttonText = this._submitButton.textContent;
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  renderLoading(isLoading) {
    if(isLoading){
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler;
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit',  (e) => {
      this.renderLoading(true);
      e.preventDefault();
      this._handleSubmit(this._getInputValues())
    });
  }
}
