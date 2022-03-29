import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, hadnleSubmit){
    super(popupSelector);
    this._hadnleSubmit = hadnleSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputs = [...this._form.querySelectorAll('.popup__input')];
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit',  () => {
      this._hadnleSubmit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
