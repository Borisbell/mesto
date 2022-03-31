export const popupZoomImg = document.querySelector('.popup_type_img-zoom');
export const popupDescription = document.querySelector('.popup__description');
export const zoomImage = document.querySelector('.popup__zoom-img');

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
