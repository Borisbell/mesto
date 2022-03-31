import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  openPopup = (name, link) => {
    document.querySelector('.popup__description').textContent = name;
    const zoomImage = document.querySelector('.popup__zoom-img');
    zoomImage.src = link;
    zoomImage.alt = name;
    super.openPopup();
    document.addEventListener('keydown', this._handleEscClose);
  }
}
