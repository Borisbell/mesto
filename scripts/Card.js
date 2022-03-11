import {popupZoomImg, popupDescription, zoomImage, openPopup} from './utils.js'

export class Card {
  constructor(data, cardTemplate) {
    this._cardTemplate = cardTemplate;
    this._name = data.name;
    this._link = data.link;
  }

  _handleLike = () => {
    this._likeButton.classList.toggle('card__like-btn_state_active');
  }

  _handleDelete = () => {
    this._deleteButton.closest('.card').remove();
  }

  _handleImgClick(event) {
    const imgLink = event.target.src;
    const card = event.target.closest('.card');
    const placeName = card.querySelector('.name_place_card').textContent;
    popupDescription.textContent = placeName;
    zoomImage.src = imgLink;
    zoomImage.alt = placeName;
    openPopup(popupZoomImg);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLike);
    this._deleteButton.addEventListener('click', this._handleDelete);
    this._newItem.querySelector('.card__img').addEventListener('click', this._handleImgClick);
  }

  createCard() {
    this._newItem = this._cardTemplate.cloneNode(true);
    this._newItem.querySelector('.name_place_card').textContent = this._name;
    this._likeButton = this._newItem.querySelector('.card__like-btn');
    this._deleteButton = this._newItem.querySelector('.card__delete-btn');

    this._newItem.querySelector('.card__img').src = this._link;
    this._newItem.querySelector('.card__img').alt = this._name;

    this._setEventListeners();

    return this._newItem
  }
}
