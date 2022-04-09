import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import './index.css';

let userId;

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatar(res.avatar);
    userId = res._id;
  })

api.getInitialCards()
.then( cardList => {
  console.log('cards from server = ', cardList);
  cardList.forEach(data => {
    const card = addCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      _id: data._id,
      userId: userId,
      ownerId: data.owner._id
    });
    section.addItem(card);
  })
})

// Buttons+popup
const infoEditButton = document.querySelector('.profile__info-edit');
const newPlaceButton = document.querySelector('.profile__add-btn');
const editAvatarButton = document.querySelector('.profile__avatar');

// Inputs profile popup
const nameInput = document.querySelector('.popup__input_content_user-name');
const jobInput = document.querySelector('.popup__input_content_job');

// Inputs places popup
const formPlace = document.querySelector('.popup__form-place');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
}

const profileEditForm = document.querySelector('#form-profile-edit');
const addCardForm = document.querySelector('#form-place-add');

const profileEditValidator = new FormValidator(validationConfig, profileEditForm);
const cardAddValidator = new FormValidator(validationConfig, addCardForm);

profileEditValidator.enableValidation();
cardAddValidator.enableValidation();

function addCard(cardElement) {
  const card = new Card(cardElement, '#card__template', () => {
    imagePopup.openPopup(cardElement.name, cardElement.link);
    },
    (id) => {
      confirmDeletePopup.openPopup();
      confirmDeletePopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then( res => {
            card.deleteCard();
            confirmDeletePopup.closePopup();
          })
      });
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
        .then( res =>{
          card.setLikes(res.likes);
        })
      } else {
        api.addLike(id)
        .then( res =>{
          card.setLikes(res.likes);
        })
      }
    }
  );
  return card.createCard();
}

function placeCard(newCard) {
  const card = addCard(newCard);
  section.addItem(card);
}

// Open popup edit profile
function openPopupBio(){
  profileEditValidator.toggleButtonState();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  updateBioPopup.openPopup();
}

// Open popup add place
function openPopupAddPlace(){
  cardAddValidator.toggleButtonState();
  addCardPopup.openPopup();
}

// Update bio
function handleFormBioSubmit(data) {
  // Получите значение полей jobInput и nameInput из свойства value
  const newName = data.firstname;
  const newJob = data.job;

  api.editProfile(newName, newJob)
    .then(res => {
      console.log('res', res);
      userInfo.setUserInfo(res.name, res.about);
    })

  updateBioPopup.closePopup();
}

// Update avatar
function handleAvatarUpdateSubmit (data) {
  console.log(data);
  const avatar = data.image;

  api.updateAvatar(avatar)
    .then(res => {
      console.log('res', res);
      userInfo.setUserAvatar(res.avatar);
    })

    confirmAvatarChange.closePopup();
}

// Add new card
function handleFormPlaceSubmit(data) {
  api.addCard(data['place-name'], data.image)
    .then(res => {
      const newCard = addCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        _id: res._id,
        userId: userId,
        ownerId: res.owner._id
      });
      section.addItem(newCard);
    })
  formPlace.reset();
  addCardPopup.closePopup();
}

infoEditButton.addEventListener('click', openPopupBio);
newPlaceButton.addEventListener('click', openPopupAddPlace);
editAvatarButton.addEventListener('click', () => {
  confirmAvatarChange.openPopup();
})

const section = new Section({ items: [], renderer: placeCard }, '.elements');
const imagePopup = new PopupWithImage('.popup_type_img-zoom');
const updateBioPopup = new PopupWithForm('.popup_type_bio', handleFormBioSubmit);
const addCardPopup = new PopupWithForm('.popup_type_place', handleFormPlaceSubmit);
const confirmDeletePopup = new PopupWithForm('.popup_type_delete-confirm', ()=>{
  api.deleteCard()
});
const confirmAvatarChange = new PopupWithForm('.popup_type_avatar-confirm', handleAvatarUpdateSubmit);
const userInfo = new UserInfo('.profile__info-name',  '.profile__info-job', '.profile__avatar');

imagePopup.setEventListeners();
updateBioPopup.setEventListeners();
addCardPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
confirmAvatarChange.setEventListeners();

section.renderItems();
