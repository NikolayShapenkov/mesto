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

// Пятая ПР
const popupAddCard = document.querySelector('.popup-cards');//Попап для добавления карточек
const aboutButtonCard = document.querySelector('.profile__add-button');//кнопка добавления карточек
const formPopupAddCardsElement = popupAddCard.querySelector('.popup-cards__form');//форма сбора данных для создания новой карточки
const popupCardFieldNameInput = popupAddCard.querySelector('.popup-cards__field_type_name');//Поле ввода в попапе для добавления карточек с названием
const popupCardFieldLinkInput = popupAddCard.querySelector('.popup-cards__field_type_link');//Поле ввода в попапе для добавления карточек со ссылкой
const closeButtonCard = popupAddCard.querySelector('.popup-cards__close');//кнопка для закрытия попапа для добавления карточек

const popupLookCard = document.querySelector('.popup-image');//Попап для просмотра карточек
const clickLookImage = document.querySelector('.element__image');//Зона клика для просмотра фото
const closeButtonImage = popupLookCard.querySelector('.popup-image__close');//кнопка для закрытия попапа с фото

// Массив, который нужно добавить в 6 карточек
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

// Архив из названий мест
/*let names = initialCards.map(function(elem) {
return elem.name;
});
console.log(names);

// Архив из ссылок на фото мест
let links = initialCards.map(function(elem) {
return elem.link;
});*/

//Функция для добавления новой карточки
const elementsContainer = document.querySelector('.elements__group');//определяем контейнер, куда будем добавлять карточку

function addCard(nameCardValue, linkCardValue) {

    const elementTemplate = document.querySelector('.element__template').content;//находим темплейт и заносим в переменную его содержимое

    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);//клонируем карточку из темплейт

    elementCard.querySelector('.element__text').textContent = nameCardValue;//! Меняем в новой карточке данные, берем их из попапа
    elementCard.querySelector('.element__image').src = linkCardValue;//! Меняем в новой карточке данные, берем их из попапа
    //Вешаем обработчик клика на лайк
    elementCard.querySelector('.element__vector').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__vector_active')});

    elementsContainer.prepend(elementCard);//вставляем на страницу новый блок с карточкой
};

// Загружаем данные из массива
initialCards.forEach(function (item) {
    nameCardValue = item.name;
    linkCardValue = item.link;
    //elementCard.querySelector('.element__image').alt = item.name;
    addCard(nameCardValue, linkCardValue);
});

//Обрабатываем данные из формы для создания новых карточек.
function handleFormCardSubmit (evt) {
    evt.preventDefault(); 

    nameCardValue = popupCardFieldNameInput.value;//заносим в переменную значения данными из поля названия
    console.log('Название', nameCardValue);
    linkCardValue = popupCardFieldLinkInput.value;//заносим в переменную значения данными из поля сылки

    addCard(nameCardValue, linkCardValue);

    toggleOpenPopupAddCards();
};
//Вешаем обработчик на форму (обработка данных из формы при клике на ДОБАВИТЬ)
formPopupAddCardsElement.addEventListener('submit', handleFormCardSubmit);

//Функция для открытия/закрытия попапа для добавления карточек
function toggleOpenPopupAddCards() {
    popupAddCard.classList.toggle('popup-cards_opened');//переключаем класс popup-cards_opened в попапе для добавления карточек
    popupCardFieldNameInput.value = ''//устанавливаем в полях нулевое значение при открытии формы
    popupCardFieldLinkInput.value = ''//устанавливаем в полях нулевое значение при открытии формы
};

function toggleOpenPopupLookImage() {
    popupLookCard.classList.toggle('popup-image_opened');//переключаем класс popup-image_opened в попапе для добавления карточек
};

aboutButtonCard.addEventListener('click', toggleOpenPopupAddCards);//открытие попапа для добавления карточек при нажатии на кнопку
closeButtonCard.addEventListener('click', toggleOpenPopupAddCards);////закрытие попапа для добавления карточек при нажатии на крестик

clickLookImage.addEventListener('click', toggleOpenPopupLookImage);//открытие попапа для просмотра фото при нажатии на кнопку
closeButtonImage.addEventListener('click', toggleOpenPopupLookImage);//открытие попапа для просмотра фото при нажатии на кнопку
