import {infoEditButton,
        newPlaceButton,
        editAvatarButton,
        nameInput,
        jobInput,
        profileEditValidator,
        cardAddValidator,
        changeAvatarValidator
      } from '../utils/constants.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import './index.css';

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    userInfo.setUserInfo(userData);
    userId = userData._id;
    // отрисовка карточек
    cards.forEach(data => {
      data.userId = userData._id;
      const card = addCard(data);
      section.addItem(card);
    })
  })
  .catch(err => {
    console.log('Ошибка: ', err)
  });

profileEditValidator.enableValidation();
cardAddValidator.enableValidation();
changeAvatarValidator.enableValidation();

function addCard(cardElement) {
  cardElement.userId = userId;
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
          .catch(err => {
            console.log('Ошибка: ', err)
          })
      });
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
        .then( res =>{
          card.setLikes(res.likes);
        })
        .catch(err => {
          console.log('Ошибка: ', err)
        })
      } else {
        api.addLike(id)
        .then( res =>{
          card.setLikes(res.likes);
        })
        .catch(err => {
          console.log('Ошибка: ', err)
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

// Open popup to change avatar
function openPopupChangeAvatar(){
  changeAvatarValidator.toggleButtonState();
  confirmAvatarChange.openPopup();
}

// Update bio
function handleFormBioSubmit(data) {
  // Получите значение полей jobInput и nameInput из свойства value
  const newName = data.firstname;
  const newJob = data.job;
  api.editProfile(newName, newJob)
    .then(res => {
      userInfo.setUserInfo(res);
      updateBioPopup.closePopup();
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    });
}

// Update avatar
function handleAvatarUpdateSubmit (data) {
  const avatar = data.image;
  api.updateAvatar(avatar)
    .then(res => {
      console.log(res);
      userInfo.setUserInfo(res);
      confirmAvatarChange.closePopup();
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    });
}

// Add new card
function handleFormPlaceSubmit(data) {
  api.addCard(data['place-name'], data.image)
    .then(res => {
      const newCard = addCard(res);
      section.addItem(newCard);
      addCardPopup.closePopup();
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`);
    })
}

infoEditButton.addEventListener('click', openPopupBio);
newPlaceButton.addEventListener('click', openPopupAddPlace);
editAvatarButton.addEventListener('click', openPopupChangeAvatar);

const section = new Section({ items: [], renderer: placeCard }, '.elements');
const imagePopup = new PopupWithImage('.popup_type_img-zoom');
const updateBioPopup = new PopupWithForm('.popup_type_bio', handleFormBioSubmit);
const addCardPopup = new PopupWithForm('.popup_type_place', handleFormPlaceSubmit);
const confirmDeletePopup = new PopupWithForm('.popup_type_delete-confirm', ()=>{});
const confirmAvatarChange = new PopupWithForm('.popup_type_avatar-confirm', handleAvatarUpdateSubmit);
const userInfo = new UserInfo('.profile__info-name',  '.profile__info-job', '.profile__avatar');

imagePopup.setEventListeners();
updateBioPopup.setEventListeners();
addCardPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
confirmAvatarChange.setEventListeners();
