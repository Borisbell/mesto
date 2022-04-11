export class Card {
  constructor(data, cardTemplateSelector, handleImgClick, handleDeleteClick, handleLikeClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.card');
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;

    this._handleDeleteClick = handleDeleteClick;
    this._handleImgClick = handleImgClick;
    this._handleLikeClick = handleLikeClick;
  }

  _fillLikeIcon() {
    this._likeButton.classList.add('card__like-btn_state_active');
  }

  _clearLikeIcon() {
    this._likeButton.classList.remove('card__like-btn_state_active');
  }

  isLiked() {
    const userLikedCard = this._likes.find(user => user._id === this._userId);
    return userLikedCard;
  }

  deleteCard() {
    this._newItem.remove();
    this._newItem = null;
  }

  setLikes(likesUpdated) {
    this._likes = likesUpdated;
    this._likesElement.textContent = this._likes.length;

    if(this.isLiked()){
      this._fillLikeIcon();
    } else {
      this._clearLikeIcon();
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._handleLikeClick(this._id)});
    this._deleteButton.addEventListener('click', () => { this._handleDeleteClick(this._id)});
    this._cardImg.addEventListener('click', this._handleImgClick);
  }

  createCard() {
    this._newItem = this._cardTemplate.cloneNode(true);
    this._newItem.querySelector('.name_place_card').textContent = this._name;
    this._likeButton = this._newItem.querySelector('.card__like-btn');
    this._deleteButton = this._newItem.querySelector('.card__delete-btn');
    this._cardImg = this._newItem.querySelector('.card__img');
    this._likesElement = this._newItem.querySelector('.card__like-count');

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this.setLikes(this._likes);

    if (this._userId !== this._ownerId){
      this._deleteButton.style.display = 'none';
    }

    this._setEventListeners();

    return this._newItem
  }
}
