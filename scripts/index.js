const page = document.querySelector('.page');//ищу элемент с классом preload, отвечающий за отключение transition при загрузке страницы (класс добавлен, чтобы попап не высвечивался на доли секунд при загрузке страницы)
const aboutButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');

let formElement = popup.querySelector('.popup__form');//форма
let fieldNameInput = formElement.querySelector('.popup__field_type_name');//Поле для имени
let fieldDescriptionInput = formElement.querySelector('.popup__field_type_description');//поле для описания
let profileTitle = document.querySelector('.profile__title');//Имя, отображаемое на странице
let profileText = document.querySelector('.profile__text');// Описание на странице

window.addEventListener('load', function() {
  page.classList.remove('preload');  
});// удаляю класс preload после полной загрузки страницы, чтобы анимация всплывающих попапов работала

function toggleOpenPopup() {
    popup.classList.toggle('popup_opened');//переключаем класс popup_opened
}

function handleAboutButtonClick() {
    fieldNameInput.value = profileTitle.textContent;//заполняем поле имени данными со страницы
    fieldDescriptionInput.value = profileText.textContent;//заполняем поле описания данными со страницы
    toggleOpenPopup();
}

/*function handleOverlyClick(event) {
    if(event.target === event.currentTarget) {
    toggleOpenPopup();
}
}*/

aboutButton.addEventListener('click', handleAboutButtonClick);
closeButton.addEventListener('click', toggleOpenPopup);
/*popup.addEventListener('click', handleOverlyClick);*/

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileTitle.textContent = fieldNameInput.value;//заполняем имя на странице данными из поля имени
    profileText.textContent = fieldDescriptionInput.value;//заполняем Описание на странице данными из поля описания

    toggleOpenPopup();
}

formElement.addEventListener('submit', handleFormSubmit);



