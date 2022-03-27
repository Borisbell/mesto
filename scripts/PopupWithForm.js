import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListeners('submit',  () => {
      console.log('submited');
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
