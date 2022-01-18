// Buttons+popup
let editbutton = document.querySelector('.profile__info-edit');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-btn');
// Profile info
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-job');
// Inputs
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_content_name');
let jobInput = document.querySelector('.popup__input_content_job');

// Open and close popup
function openPopup(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup__opened');
}

function closePopup(){
  popup.classList.remove('popup__opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  let newName = nameInput.value;
  let newJob = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup()
}

editbutton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);





