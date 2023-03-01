const aboutButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');

let formElement = popup.querySelector('.popup__form');//форма
let fieldNameInput = formElement.querySelector('.popup__field_type_name');//Поле для имени
let fieldDescriptionInput = formElement.querySelector('.popup__field_type_description');//поле для описания
let ProfileTitle = document.querySelector('.profile__title');//Имя, отображаемое на странице
let ProfileText = document.querySelector('.profile__text');// Описание на странице

function toggleOpenPopup() {
    popup.classList.toggle('popup_opened');
}

function handleAboutButtonClick() {
    fieldNameInput.value = ProfileTitle.textContent;//заполняем поле имени данными со страницы
    fieldDescriptionInput.value = ProfileText.textContent;//заполняем поле описания данными со страницы
    toggleOpenPopup();
}

/*function handleOverlyClick(event) {
    if(event.target === event.currentTarget) {
    toggleOpenPopup();
}
}*/

aboutButton.addEventListener('click', handleAboutButtonClick);
closeButton.addEventListener('click', handleAboutButtonClick);
/*popup.addEventListener('click', handleOverlyClick);*/

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    ProfileTitle.textContent = fieldNameInput.value;//заполняем имя на странице данными из поля имени
    ProfileText.textContent = fieldDescriptionInput.value;//заполняем Описание на странице данными из поля описания
    
    toggleOpenPopup();
}

formElement.addEventListener('submit', handleFormSubmit);


