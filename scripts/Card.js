import {popupZoomImg, popupDescription, zoomImage, openPopup} from './utils.js'

export class Card {
  constructor(data, cardTemplateSelector) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.card');
    this._name = data.name;
    this._link = data.link;
  }

  _handleLike = () => {
    this._likeButton.classList.toggle('card__like-btn_state_active');
  }

  _handleDelete = () => {
    this._newItem.remove();
    this._newItem = null;
  }

  _handleImgClick = () => {
    popupDescription.textContent = this._name;
    zoomImage.src = this._link;
    zoomImage.alt = this._name;
    openPopup(popupZoomImg);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLike);
    this._deleteButton.addEventListener('click', this._handleDelete);
    this._cardImg.addEventListener('click', this._handleImgClick);
  }

  createCard() {
    this._newItem = this._cardTemplate.cloneNode(true);
    this._newItem.querySelector('.name_place_card').textContent = this._name;
    this._likeButton = this._newItem.querySelector('.card__like-btn');
    this._deleteButton = this._newItem.querySelector('.card__delete-btn');
    this._cardImg = this._newItem.querySelector('.card__img');

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._setEventListeners();

    return this._newItem
  }
}
