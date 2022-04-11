import { FormValidator } from '../components/FormValidator.js';

// Buttons+popup
export const infoEditButton = document.querySelector('.profile__info-edit');
export const newPlaceButton = document.querySelector('.profile__add-btn');
export const editAvatarButton = document.querySelector('.profile__avatar-container');

// Inputs profile popup
export const nameInput = document.querySelector('.popup__input_content_user-name');
export const jobInput = document.querySelector('.popup__input_content_job');

// Inputs places popup
export const formPlace = document.querySelector('.popup__form-place');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
}

const profileEditForm = document.querySelector('#form-profile-edit');
const addCardForm = document.querySelector('#form-place-add');
const changeAvatarForm = document.querySelector('#avatar-edit-confirm')

export const profileEditValidator = new FormValidator(validationConfig, profileEditForm);
export const cardAddValidator = new FormValidator(validationConfig, addCardForm);
export const changeAvatarValidator = new FormValidator(validationConfig, changeAvatarForm);
