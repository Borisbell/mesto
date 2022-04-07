export class Card {
  constructor(data, cardTemplateSelector, handleImgClick, handleDeleteClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.card');
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._handleDeleteClick = handleDeleteClick;
    this._handleImgClick = handleImgClick;
  }

  _handleLike = () => {
    this._likeButton.classList.toggle('card__like-btn_state_active');
  }

  deleteCard() {
    this._newItem.remove();
    this._newItem = null;
  }

  _setLikes() {
    const likes = this._newItem.querySelector('.card__like-count');
    likes.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLike);
    this._deleteButton.addEventListener('click', () => {this._handleDeleteClick(this._id)});
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
    this._setLikes();

    if (this._userId !== this._ownerId){
      this._deleteButton.style.display = 'none';
    }

    this._setEventListeners();

    return this._newItem
  }
}
