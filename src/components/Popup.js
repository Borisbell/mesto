export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.closeButton = this._popup.querySelector('.popup__close-btn');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this.closeButton.addEventListener('click', () => {
      this.closePopup();
    })

    this._popup.addEventListener('mousedown', (e) => {
      if(!e.target.closest('.popup__container')){
        this.closePopup();
      }
    })
  }

}
