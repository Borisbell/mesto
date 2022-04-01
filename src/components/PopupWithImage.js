import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  openPopup = (name, link) => {
    this._popup.querySelector('.popup__description').textContent = name;
    const zoomImage = this._popup.querySelector('.popup__zoom-img');
    zoomImage.src = link;
    zoomImage.alt = name;
    super.openPopup();
  }
}
