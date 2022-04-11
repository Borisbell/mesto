import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._zoomImage = this._popup.querySelector('.popup__zoom-img');
    this._popUpDescription = this._popup.querySelector('.popup__description')
  }

  openPopup = (name, link) => {
    this._popUpDescription.textContent = name;
    this._zoomImage.src = link;
    this._zoomImage.alt = name;
    super.openPopup();
  }
}
