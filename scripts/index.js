import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { openPopup, closePopup } from './utils.js';

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
// const popups = document.querySelectorAll('.popup');
const popupBio = document.querySelector('.popup_type_bio');
// // const popupAddPlace = document.querySelector('.popup_type_place');
// const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

// Profile info
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');

// Inputs profile popup
// const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_content_user-name');
const jobInput = document.querySelector('.popup__input_content_job');

// Inputs places popup
const formPlace = document.querySelector('.popup__form-place');
const placeNameInput = document.querySelector('.popup__input_content_place-name');
const imgLinkInput = document.querySelector('.popup__input_content_img');

// Card Template
const elements = document.querySelector('.elements');

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

function placeCard(container, newCard) {
  const card = addCard(newCard);
  container.prepend(card);
}

// Open popup edit profile
function openPopupBio(){
  profileEditValidator.toggleButtonState();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // openPopup(popupBio);
  updateBioPopup.openPopup();
}

// Open popup add place
function openPopupAddPlace(){
  cardAddValidator.toggleButtonState();
  // openPopup(popupAddPlace);
  addCardPopup.openPopup();
}

// Update bio
function handleFormBioSubmit (evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  profileEditForm.reset();
  // closePopup(popupBio);
  updateBioPopup.closePopup();
}

// Add new card
function handleFormPlaceSubmit (evt) {
  evt.preventDefault();
  const newPlaceName = placeNameInput.value;
  const imgLink = imgLinkInput.value;
  const cardObj = {name: newPlaceName, link: imgLink};
  const newCard = addCard(cardObj);
  placeCard(elements, newCard);
  section.addItem(newCard);
  formPlace.reset();
  // closePopup(popupAddPlace);
  addCardPopup.closePopup();
}

infoEditButton.addEventListener('click', openPopupBio);
// formElement.addEventListener('submit', handleFormBioSubmit);
// formPlace.addEventListener('submit', handleFormPlaceSubmit);
newPlaceButton.addEventListener('click', openPopupAddPlace);

//PR-8
const section = new Section({ items: initialCards, renderer: placeCard }, '.elements');

const imagePopup = new PopupWithImage('.popup_type_img-zoom');
const updateBioPopup = new PopupWithForm('.popup_type_bio');
const addCardPopup = new PopupWithForm('.popup_type_place');

imagePopup.setEventListeners();
updateBioPopup.setEventListeners();
addCardPopup.setEventListeners();

section.renderItems();
