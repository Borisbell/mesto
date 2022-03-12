import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
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
const editButton = document.querySelector('.profile__info-edit');
const addPlaceButton = document.querySelector('.profile__add-btn');
const popups = document.querySelectorAll('.popup');
const popupBio = document.querySelector('.popup_type_bio');
const popupAddPlace = document.querySelector('.popup_type_place');
const addPlaceForm = popupAddPlace.querySelector('form');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

// Profile info
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-job');

// Inputs profile popup
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_content_user-name');
const jobInput = document.querySelector('.popup__input_content_job');

// Inputs places popup
const formPlace = document.querySelector('.popup__form-place');
const placeNameInput = document.querySelector('.popup__input_content_place-name');
const imgLinkInput = document.querySelector('.popup__input_content_img');

// Card Template
const cardTemplate = document.querySelector('#card__template').content;
const elements = document.querySelector('.elements');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
}

const editForm = document.querySelector('#form-profile-edit');
const addCardForm = document.querySelector('#form-place-add');

const editProfileValidator = new FormValidator(validationConfig, editForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function addCard(cardElement) {
  const card = new Card(cardElement, '#card__template');
  return card.createCard();
}

function placeCard(container, newCard) {
  container.prepend(newCard);
}

//render initial cards
function renderCards() {
  initialCards.forEach((item) => {
    const newCard = addCard(item);
    placeCard(elements, newCard);
  });
}

renderCards();

// Open popup edit profile
function openPopupBio(){
  editProfileValidator.toggleButtonState();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupBio);
}

// Open popup add place
function openPopupAddPlace(){
  addCardValidator.toggleButtonState();
  openPopup(popupAddPlace);
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
  editForm.reset();
  closePopup(popupBio);
}

// Add new card
function handleFormPlaceSubmit (evt) {
  evt.preventDefault();
  const newPlaceName = placeNameInput.value;
  const imgLink = imgLinkInput.value;
  const cardObj = {name: newPlaceName, link: imgLink};
  const newCard = addCard(cardObj);
  placeCard(elements, newCard);
  addPlaceForm.reset();
  closePopup(popupAddPlace);
}

editButton.addEventListener('click', openPopupBio);
formElement.addEventListener('submit', handleFormBioSubmit);
formPlace.addEventListener('submit', handleFormPlaceSubmit);
addPlaceButton.addEventListener('click', openPopupAddPlace);

popupCloseButtons.forEach( button =>
  button.addEventListener('click', function(event){
    closePopup(event.target.closest('.popup'));
  })
);

popups.forEach(popup => {
  popup.addEventListener('mousedown', function(e){
    if(e.target === e.currentTarget){
      closePopup(popup)
    }
  })
});
