import { Popup } from './Popup.js';
import { popupDescription, zoomImage} from './utils.js'

export class PopupWithImage extends Popup {
  openPopup = (name, link) => {
    popupDescription.textContent = name;
    zoomImage.src = link;
    zoomImage.alt = name;
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
}
