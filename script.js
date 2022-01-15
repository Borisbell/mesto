let editbutton = document.querySelector('.profile__info-edit');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-btn');

// Open and close popup

function openPopup(){
  popup.classList.add('popup__opened');
}

function closePopup(){
  popup.classList.remove('popup__opened');
}

editbutton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// Edit profile data
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');

// console.log(profileName);

function formSubmitHandler (evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  let newName = nameInput.value;
  let newJob = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__info-name');
  let profileJob = document.querySelector('.profile__info-job');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
