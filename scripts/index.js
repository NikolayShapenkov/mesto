const aboutButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const CloseButton = popup.querySelector('.popup__close');
const ButtonSave = popup.querySelector('.popup__save');

function toggleOpenPopup() {
    popup.classList.toggle('popup_opened');
}

function handleAboutButtonClick() {
    toggleOpenPopup();
}

function handleCloseButtonClick() {
    toggleOpenPopup();
}

function handleOverlyClick(event) {
    if(event.target === event.currentTarget) {
    toggleOpenPopup();
}
}

aboutButton.addEventListener('click', handleAboutButtonClick);
CloseButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handleOverlyClick);


let formElement = popup.querySelector('.popup__form');//форма
let fieldNameInput = formElement.querySelector('.popup__field-name');//Поле для имени
let fieldDescriptionInput = formElement.querySelector('.popup__field-description');//поле для описания
let ProfileTitle = document.querySelector('.profile__title');//Имя, отображаемое на странице
let ProfileText = document.querySelector('.profile__text');// Описание на странице

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    fieldNameInput.textContent = ProfileTitle.value;//заполняем поле имени данными со страницы
    fieldDescriptionInput.textContent = ProfileText.value;//заполняем поле описания данными со страницы
    
    ProfileTitle.textContent = fieldNameInput.value;//заполняем имя на странице данными из поля имени
    ProfileText.textContent = fieldDescriptionInput.value;//заполняем Описание на странице данными из поля описания
    toggleOpenPopup();
}

formElement.addEventListener('submit', handleFormSubmit);


