import {infoEditButton,
        newPlaceButton,
        editAvatarButton,
        nameInput,
        jobInput,
        validationConfig
      } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
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
    // // отрисовка карточек
    section.renderItems(cards);
  })
  .catch(err => {
    console.log('Ошибка: ', err)
  });

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

function addCard(cardElement) {
  cardElement.userId = userId;
  const card = new Card(cardElement, '#card__template', () => {
    imagePopup.openPopup(cardElement.name, cardElement.link);
    },
    (id) => {
      confirmDeletePopup.openPopup();
      confirmDeletePopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then( (res) => {
            card.deleteCard();
          })
          .then(() => {
            confirmDeletePopup.closePopup();
          })
          .catch(err => {
            console.log('Ошибка: ', err)
          })
          .finally(() => {
            confirmDeletePopup.renderLoading(false);
          });
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
  formValidators['profile-edit'].toggleButtonState();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  updateBioPopup.openPopup();
}

// Open popup add place
function openPopupAddPlace(){
  formValidators['place-add'].toggleButtonState();
  addCardPopup.openPopup();
}

// Open popup to change avatar
function openPopupChangeAvatar(){
  formValidators['avatar-edit-confirm'].toggleButtonState();
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
    })
    .then(() => {
      updateBioPopup.closePopup();
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    })
    .finally(() => {
      updateBioPopup.renderLoading(false);
    });
}

// Update avatar
function handleAvatarUpdateSubmit (data) {
  const avatar = data.image;
  api.updateAvatar(avatar)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .then(() => {
      confirmAvatarChange.closePopup();
    })
    .catch(err => {
      console.log('Ошибка: ', err)
    })
    .finally(() => {
      confirmAvatarChange.renderLoading(false);
    });
}

// Add new card
function handleFormPlaceSubmit(data) {
  api.addCard(data['place-name'], data.image)
    .then(res => {
      const newCard = addCard(res);
      section.addItem(newCard);
    })
    .then(() => {
      addCardPopup.closePopup();
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`);
    })
    .finally(() => {
      addCardPopup.closePopup();
      addCardPopup.renderLoading(false);
    });
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
