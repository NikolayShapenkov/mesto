const page = document.querySelector('.page');//ищу элемент с классом preload, отвечающий за отключение transition при загрузке страницы (класс добавлен, чтобы попап не высвечивался на доли секунд при загрузке страницы)
const aboutButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__close');

const formElement = popup.querySelector('.popup__form');//форма
const fieldNameInput = formElement.querySelector('.popup__field_type_name');//Поле для имени
const fieldDescriptionInput = formElement.querySelector('.popup__field_type_description');//поле для описания
const profileTitle = document.querySelector('.profile__title');//Имя, отображаемое на странице
const profileText = document.querySelector('.profile__text');// Описание на странице

window.addEventListener('load', function() {
  page.classList.remove('preload');  
});// удаляю класс preload после полной загрузки страницы, чтобы анимация всплывающих попапов работала

//Можно я не буду удалять излишние комментарии? Удалю, когда сдам 6ПР, пишу для себя. спасибо)))
//Новые функции для открытия и закрытия попапов

function openPopup(popupClass) {
  popupClass.classList.add('popup_opened');
};

function closePopup(popupClass) {
  popupClass.classList.remove('popup_opened');
};

function closePopupProfile() {
  closePopup(popup);
};

function handleAboutButtonClick() {
  fieldNameInput.value = profileTitle.textContent;//заполняем поле имени данными со страницы
  fieldDescriptionInput.value = profileText.textContent;//заполняем поле описания данными со страницы
  openPopup(popup);
};

/*function handleOverlyClick(event) {
  if(event.target === event.currentTarget) {
  toggleOpenPopup();
}
}*/

aboutButton.addEventListener('click', handleAboutButtonClick);
buttonClose.addEventListener('click', closePopupProfile);

function handleAboutButtonSubmitFormProfile (evt) {
  evt.preventDefault(); 

  profileTitle.textContent = fieldNameInput.value;//заполняем имя на странице данными из поля имени
  profileText.textContent = fieldDescriptionInput.value;//заполняем Описание на странице данными из поля описания

  closePopupProfile();
}

formElement.addEventListener('submit', handleAboutButtonSubmitFormProfile);

// Пятая ПР
const popupAddCard = document.querySelector('.popup-cards');//Попап для добавления карточек
const aboutButtonCard = document.querySelector('.profile__add-button');//кнопка добавления карточек
const elementText = document.querySelector('.element__text');//Текст из добавленного темплейта
const formPopupAddCardsElement = popupAddCard.querySelector('.popup-cards__form');//форма сбора данных для создания новой карточки
const popupCardFieldNameInput = popupAddCard.querySelector('.popup-cards__field_type_name');//Поле ввода в попапе для добавления карточек с названием
const popupCardFieldLinkInput = popupAddCard.querySelector('.popup-cards__field_type_link');//Поле ввода в попапе для добавления карточек со ссылкой
const buttonCloseCard = popupAddCard.querySelector('.popup-cards__close');//кнопка для закрытия попапа для добавления карточек

const popupLookCard = document.querySelector('.popup-image');//Попап для просмотра карточек
const clickLookImage = document.querySelector('.element__image');//Зона клика (картинка) для просмотра фото
const popupImagePictures = popupLookCard.querySelector('.popup-image__picture');//Картинка в попапе для просмотра фото
const popupImageText = popupLookCard.querySelector('.popup-image__text');//Картинка в попапе для просмотра фото
const buttonCloseImage = popupLookCard.querySelector('.popup-image__close');//кнопка для закрытия попапа с фото
const elementsContainer = document.querySelector('.elements__group');//определяем контейнер, куда будем добавлять карточку

//Функция для создания карточки и установки слушателей.
function creatCard(nameCardValue, linkCardValue) {

  const elementTemplate = document.querySelector('.element__template').content;//находим темплейт и заносим в переменную его содержимое

  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);//клонируем карточку из темплейт

  elementCard.querySelector('.element__text').textContent = nameCardValue;//! Меняем в новой карточке данные, берем их из попапа
  elementCard.querySelector('.element__image').src = linkCardValue;//! Меняем в новой карточке данные, берем их из попапа
  elementCard.querySelector('.element__image').alt = nameCardValue;// меняем атрибут alt у тега img
  //Вешаем обработчик клика на лайк
  elementCard.querySelector('.element__vector').addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__vector_active')});
  //Настраиваем удаление карточки при клике на кнопку с урной
  //Вешаем обработчик клика на кнопку удаления
  elementCard.querySelector('.element__delete').addEventListener('click', function() {
  const elementCardForDelete = elementCard.querySelector('.element__delete').closest('.element');
  elementCardForDelete.remove();
  });
    
  elementCard.querySelector('.element__image').addEventListener('click', openPopupLookImage);//вешаем обработчик клика на картинку для открытия попапа
  
  return newElementCard = elementCard;
};

//функция для вставки возвращенной готовой карточки
function renderCard(nameCardValue, linkCardValue) {
  creatCard(nameCardValue, linkCardValue);
  elementsContainer.prepend(newElementCard);//вставляем на страницу новый блок с карточкой
};

//Нужно занести в переменные данные из массива initialCards и загрузить на страницу
initialCards.forEach(function (item) {
  const nameCardValue = item.name;
  const linkCardValue = item.link;
  renderCard(nameCardValue, linkCardValue);
});

//Обрабатываем данные из формы для создания новых карточек.
function handleFormCardSubmit (evt) {
  evt.preventDefault(); 

  const nameCardValue = popupCardFieldNameInput.value;//заносим в переменную значения данными из поля названия
  const linkCardValue = popupCardFieldLinkInput.value;//заносим в переменную значения данными из поля сылки

  renderCard(nameCardValue, linkCardValue);

  closePopupForAddCards();
  evt.target.reset();
};

//Новая функция для открытия по кнопке добавления
function openPopupForAddCards() {
  openPopup(popupAddCard);
};

//Новая функция для закрытия по кнопке с крестиком 
function closePopupForAddCards() {
  closePopup(popupAddCard);
};

//Новая функция для открытия по клику на картинку 
function openPopupLookImage(evt) {
  openPopup(popupLookCard);
  popupImageText.textContent = evt.target.alt;//Выводим название места в попап
  popupImagePictures.src = evt.target.src;//выводим картинку, на которую тапнули
};

//Новая функция для закрытия по клику на крестик над картинкой 
function closePopupLookImage() {
  closePopup(popupLookCard);
};

aboutButtonCard.addEventListener('click', openPopupForAddCards);//открытие попапа для добавления карточек при нажатии на кнопку
buttonCloseCard.addEventListener('click', closePopupForAddCards);////закрытие попапа для добавления карточек при нажатии на крестик
formPopupAddCardsElement.addEventListener('submit', handleFormCardSubmit);//Вешаем обработчик на форму (обработка данных из формы при клике на ДОБАВИТЬ)
buttonCloseImage.addEventListener('click', closePopupLookImage);//закрытие попапа для просмотра фото при нажатии на кнопку
