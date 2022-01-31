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
const popup = document.querySelector('.popup');
const popupBio = document.querySelector('.popup_type_bio');
const popupAddPlace = document.querySelector('.popup_type_place');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const popupZoomImg = document.querySelector('.popup_type_img-zoom');


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
const cardImg = document.querySelector('.card__img');
const cardName = document.querySelector('.name_place_card');
const elements = document.querySelector('.elements');

//render initial cards
function renderCards() {
  initialCards.forEach(renderItem);
}

function renderItem(obj) {
  const newItem = cardTemplate.cloneNode(true);
  newItem.querySelector('.name_place_card').innerText = obj.name;
  newItem.querySelector('.card__img').src = obj.link;
  addListeners(newItem);
  elements.prepend(newItem);
}

//Add listeners for elements inside rendered card
function addListeners(el) {
  el.querySelector('.card__like-btn').addEventListener('click', handleLike);
  el.querySelector('.card__delete-btn').addEventListener('click', handleDelete);
  el.querySelector('.card__img').addEventListener('click', handleImgClick);
}

function handleLike(event) {
  event.target.classList.toggle('card__like-btn_state_active');
}

function handleDelete(event) {
  event.target.closest('.card').remove();
}

function handleImgClick(event) {
  const imgLink = event.target.src;
  const card = event.target.closest('.card');
  const placeName = card.querySelector('.name_place_card').textContent;
  document.querySelector('.popup__description').textContent = placeName;
  document.querySelector('.popup__zoom-img').src = imgLink;
  popupZoomImg.classList.add('popup_opened');
}

renderCards();

// Open popup edit profile
function openPopupBio(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupBio.classList.add('popup_opened');
}

// Open popup add place
function openPopupAddPlace(){
  popupAddPlace.classList.add('popup_opened');
}

// Close any popup
function closePopup(event){
  event.target.closest('.popup').classList.remove('popup_opened');
}

// Update bio
function formBioSubmitHandler (evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  popupBio.classList.remove('popup_opened');
}

// Add new card
function formPlaceSubmitHandler (evt) {
  evt.preventDefault();
  const newPlaceName = placeNameInput.value;
  const imgLink = imgLinkInput.value;
  const item = {};
  item.name = newPlaceName;
  item.link = imgLink;
  renderItem(item);
  popupAddPlace.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopupBio);
formElement.addEventListener('submit', formBioSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);
addPlaceButton.addEventListener('click', openPopupAddPlace);

popupCloseButtons.forEach( button =>
  button.addEventListener('click', closePopup)
);
