import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import './index.css';

api.getProfile()
  .then(res => {
    console.log(res);
    userInfo.setUserInfo(res.name, res.about);
  })

  api.getInitialCards()
  .then( cardList => {
    cardList.forEach(data => {
      const card = addCard(data);
      section.addItem(card);
    })
  })

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Buttons+popup
const infoEditButton = document.querySelector('.profile__info-edit');
const newPlaceButton = document.querySelector('.profile__add-btn');

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
  });
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
function handleFormBioSubmit (data) {
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

// Add new card
function handleFormPlaceSubmit(data) {
  const cardObj = {name: data['place-name'], link: data.image};
  const newCard = addCard(cardObj);
  section.addItem(newCard);
  formPlace.reset();
  addCardPopup.closePopup();
}

infoEditButton.addEventListener('click', openPopupBio);
newPlaceButton.addEventListener('click', openPopupAddPlace);


const section = new Section({ items: initialCards, renderer: placeCard }, '.elements');
const imagePopup = new PopupWithImage('.popup_type_img-zoom');
const updateBioPopup = new PopupWithForm('.popup_type_bio', handleFormBioSubmit);
const addCardPopup = new PopupWithForm('.popup_type_place', handleFormPlaceSubmit);
const userInfo = new UserInfo('.profile__info-name',  '.profile__info-job');

imagePopup.setEventListeners();
updateBioPopup.setEventListeners();
addCardPopup.setEventListeners();

section.renderItems();
