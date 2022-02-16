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
const popupZoomImg = document.querySelector('.popup_type_img-zoom');
const popupDescription = document.querySelector('.popup__description');
const zoomImage = document.querySelector('.popup__zoom-img');

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

function createCard(obj) {
  const newItem = cardTemplate.cloneNode(true);
  newItem.querySelector('.name_place_card').textContent = obj.name;
  newItem.querySelector('.card__img').src = obj.link;
  newItem.querySelector('.card__img').alt = obj.name;
  addListeners(newItem);
  return newItem
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

//render initial cards
function renderCards() {
  initialCards.map(createCard).forEach((item)=>addCard(elements, item));
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

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Open any popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function handleImgClick(event) {
  const imgLink = event.target.src;
  const card = event.target.closest('.card');
  const placeName = card.querySelector('.name_place_card').textContent;
  popupDescription.textContent = placeName;
  zoomImage.src = imgLink;
  zoomImage.alt = placeName;
  openPopup(popupZoomImg);
}

renderCards();

// Open popup edit profile
function openPopupBio(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupBio);
}

// Open popup add place
function openPopupAddPlace(){
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
  popupAddPlace.querySelector('form').reset();
  closePopup(popupBio);
}

// Add new card
function handleFormPlaceSubmit (evt) {
  evt.preventDefault();
  const newPlaceName = placeNameInput.value;
  const imgLink = imgLinkInput.value;
  addCard(elements, createCard({ name: newPlaceName, link: imgLink }))
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
  popup.addEventListener('click', function(e){
    if(e.target === e.currentTarget){
      closePopup(popup)
    }
  })
});
