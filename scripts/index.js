import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { formValidationConfig } from "./validate.js";
import { Card } from "./Card.js";

const page = document.querySelector(".page"); //ищу элемент с классом preload, отвечающий за отключение transition при загрузке страницы (класс добавлен, чтобы попап не высвечивался на доли секунд при загрузке страницы)
const aboutButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
const popupAddCard = document.querySelector(".popup-cards"); //Попап для добавления карточек
export const popupLookCard = document.querySelector(".popup-image"); //Попап для просмотра карточек
const buttonCloseProfilePopup = popupProfile.querySelector(".popup__close");

const elementTemplate = document.querySelector(".element__template").content; //находим темплейт и заносим в переменную его содержимое

const formElementProfile = popupProfile.querySelector(".popup__form"); //форма в попапе редактирования профиля
const formElementCard = document.querySelector(".popup-cards__form");
const fieldNameInput = formElementProfile.querySelector(
  ".popup__field_type_name"
); //Поле для имени
const fieldDescriptionInput = formElementProfile.querySelector(
  ".popup__field_type_description"
); //поле для описания
const profileTitle = document.querySelector(".profile__title"); //Имя, отображаемое на странице
const profileText = document.querySelector(".profile__text"); // Описание на странице

const aboutButtonCard = document.querySelector(".profile__add-button"); //кнопка добавления карточек
const elementText = document.querySelector(".element__text"); //Текст из добавленного темплейта
const formPopupAddCardsElement =
  popupAddCard.querySelector(".popup-cards__form"); //форма сбора данных для создания новой карточки
const buttonSubmitPopupCards =
  formPopupAddCardsElement.querySelector(".popup__save");
const popupCardFieldNameInput = popupAddCard.querySelector(
  ".popup__field_type_name"
); //Поле ввода в попапе для добавления карточек с названием
const popupCardFieldLinkInput = popupAddCard.querySelector(
  ".popup__field_type_link"
); //Поле ввода в попапе для добавления карточек со ссылкой
const buttonCloseCard = popupAddCard.querySelector(".popup__close"); //кнопка для закрытия попапа для добавления карточек

const clickLookImage = document.querySelector(".element__image"); //Зона клика (картинка) для просмотра фото
export const popupImagePictures = popupLookCard.querySelector(
  ".popup-image__picture"
); //Картинка в попапе для просмотра фото
export const popupImageText = popupLookCard.querySelector(".popup-image__text"); //Картинка в попапе для просмотра фото
const buttonCloseImage = popupLookCard.querySelector(".popup-image__close"); //кнопка для закрытия попапа с фото
const elementsContainer = document.querySelector(".elements__group"); //определяем контейнер, куда будем добавлять карточку

window.addEventListener("load", function () {
  page.classList.remove("preload");
}); // удаляю класс preload после полной загрузки страницы, чтобы анимация всплывающих попапов работала

//Новые функции для открытия и закрытия попапов
export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handlePopupKeydown);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlePopupKeydown);
}

function closePopupProfile() {
  closePopup(popupProfile);
}

function handleAboutButtonClick() {
  fieldNameInput.value = profileTitle.textContent; //заполняем поле имени данными со страницы
  fieldDescriptionInput.value = profileText.textContent; //заполняем поле описания данными со страницы
  formProfilValidator.resetValidation();
  openPopup(popupProfile);
}

function handleOverlyPopupClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

export function handlePopupKeydown(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

aboutButton.addEventListener("click", handleAboutButtonClick);
buttonCloseProfilePopup.addEventListener("click", closePopupProfile);

const popups = Array.from(document.querySelectorAll(".popup"));

popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlyPopupClick);
});

function handleAboutButtonSubmitFormProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = fieldNameInput.value; //заполняем имя на странице данными из поля имени
  profileText.textContent = fieldDescriptionInput.value; //заполняем Описание на странице данными из поля описания

  closePopupProfile();
}

formElementProfile.addEventListener(
  "submit",
  handleAboutButtonSubmitFormProfile
);

//Примет в себя готовую карточку и вставит в разметку
function insertNewCard(newCard) {
  elementsContainer.prepend(newCard);
}

// Примет в себя любой объект и создаст из него новую карточку
function createnNewCard(object) {
  // Создадим экземпляр карточки
  const card = new Card(object, ".element__template");
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateNewCard();
  insertNewCard(cardElement);
}

//Перебирает массив и для каждого объекта создает карточку и наполняет данными из объекта
initialCards.forEach((item) => {
  createnNewCard(item);
});

// Новая Функция для создания карточек и вставки из формы
function renderCard(nameCardValue, linkCardValue) {
  const arrayCard = { name: nameCardValue, link: linkCardValue };

  createnNewCard(arrayCard);
}

//Обрабатываем данные из формы для создания новых карточек.
function handleFormCardSubmit(evt) {
  evt.preventDefault();

  const nameCardValue = popupCardFieldNameInput.value; //заносим в переменную значения данными из поля названия
  const linkCardValue = popupCardFieldLinkInput.value; //заносим в переменную значения данными из поля сылки

  renderCard(nameCardValue, linkCardValue);

  formElementCardValidator.disableSubmitButton();

  /*disableSubmitButton(
    buttonSubmitPopupCards,
    formValidationConfig.inactiveButtonClass
  );*/

  closePopupForAddCards();
}

//Новая функция для открытия по кнопке добавления
function openPopupForAddCards() {
  formElementCardValidator.resetValidation();
  formElementCard.reset();
  openPopup(popupAddCard);
}

//Новая функция для закрытия по кнопке с крестиком
function closePopupForAddCards() {
  closePopup(popupAddCard);
}

//Новая функция для открытия по клику на картинку
function openPopupLookImage(evt) {
  openPopup(popupLookCard);
  popupImageText.textContent = evt.target.alt; //Выводим название места в попап
  popupImagePictures.src = evt.target.src; //выводим картинку, на которую тапнули
}

//Новая функция для закрытия по клику на крестик над картинкой
function closePopupLookImage() {
  closePopup(popupLookCard);
}

aboutButtonCard.addEventListener("click", openPopupForAddCards); //открытие попапа для добавления карточек при нажатии на кнопку
buttonCloseCard.addEventListener("click", closePopupForAddCards); ////закрытие попапа для добавления карточек при нажатии на крестик
formPopupAddCardsElement.addEventListener("submit", handleFormCardSubmit); //Вешаем обработчик на форму (обработка данных из формы при клике на ДОБАВИТЬ)
buttonCloseImage.addEventListener("click", closePopupLookImage); //закрытие попапа для просмотра фото при нажатии на кнопку

const formProfilValidator = new FormValidator(
  formValidationConfig,
  formElementProfile
); //создаю экземпляр карда
formProfilValidator.enableValidation();

const formElementCardValidator = new FormValidator(
  formValidationConfig,
  formElementCard
); //создаю экземпляр карда
formElementCardValidator.enableValidation();

//все ЗАКОММЕНТИРОВАННОЕ Уберу после ревью)

/*
//Функция для перебора массива и созданию карточек и их вставки
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, ".element__template");
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateNewCard();
  // Добавляем в DOM
  elementsContainer.prepend(cardElement);
}); 

// Ноыая Функция для создания карточек и вставки из формы
function renderCard (nameCardValue, linkCardValue) {

  const arrayCard = 
    {name: nameCardValue,
     link: linkCardValue,
  };

  const card = new Card(arrayCard, ".element__template");
  const cardElement = card.generateNewCard();
  
  elementsContainer.prepend(cardElement);
};
*/

/*//Функция для создания карточки и установки слушателей.
function creatCard(nameCardValue, linkCardValue) {
  const elementCard = elementTemplate.querySelector(".element").cloneNode(true); //клонируем карточку из темплейт
  const elementCardImage = elementCard.querySelector(".element__image");//находим картинку в темплейте в клонированном

  elementCard.querySelector(".element__text").textContent = nameCardValue; //! Меняем в новой карточке данные, берем их из попапа
  elementCardImage.src = linkCardValue; //! Меняем в новой карточке данные, берем их из попапа
  elementCardImage.alt = nameCardValue; // меняем атрибут alt у тега img

  //Вешаем обработчик клика на лайк (при клике добавляется класс элементу)
  elementCard
    .querySelector(".element__vector")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__vector_active");
    });

  //Настраиваем удаление карточки при клике на кнопку с урной
  //Вешаем обработчик клика на кнопку удаления
  elementCard
    .querySelector(".element__delete")
    .addEventListener("click", function () {
      const elementCardForDelete = elementCard
        .querySelector(".element__delete")
        .closest(".element");
      elementCardForDelete.remove();
    });

  elementCardImage.addEventListener("click", openPopupLookImage); //вешаем обработчик клика на картинку для открытия попапа

  return (newElementCard = elementCard);
}*/

/*
// Создаю класс, который создаёт карточку с текстом и ссылкой на изображение:

class Card {
  constructor(data, temlateSelector) {
    this._image = data.link;
    this._text = data.name;
    this._selector = temlateSelector;//здесь будет разметка селектора из темплейт
  }

_getTemplate() {
  const cloneCard = document.querySelector(this._selector).content.querySelector(".element").cloneNode(true); //клонируем карточку из темплейт
  return cloneCard;
}

generateNewCard() {
  this._cloneCard = this._getTemplate();//записываем разметку новой карточки в перем
  this._setEventListeners();
  const cloneCardImage = this._cloneCard.querySelector(".element__image");//находим картинку в клоне карты
  cloneCardImage.src = this._image; // Меняем в новой карточке данные, берем их из свойств класса
  cloneCardImage.alt = this._text;
  this._cloneCard.querySelector(".element__text").textContent = this._text; //! Меняем в новой карточке данные, берем их из попапа
  return this._cloneCard;
}

_setEventListeners() {
this._cloneCard.querySelector(".element__vector").addEventListener("click", (evt) => {
    this._handleClickLike(evt)});
this._cloneCard
    .querySelector(".element__delete")
    .addEventListener("click", () => {
      this._handleClickButtonDelete()
    });
this._cloneCard.querySelector(".element__image").addEventListener("click", (evt) => {
  this._openPopupLookImage(evt)}); //вешаем обработчик клика на картинку для открытия попапа    
}

_openPopupLookImage(evt) {
  openPopup(popupLookCard);
  popupImageText.textContent = evt.target.alt; //Выводим название места в попап
  popupImagePictures.src = evt.target.src; //выводим картинку, на которую тапнули
}


_handleClickLike(evt) {   
  evt.target.classList.toggle("element__vector_active");
    };

_handleClickButtonDelete() {
      const elementCardForDelete = this._cloneCard
        .querySelector(".element__delete")
        .closest(".element");
      elementCardForDelete.remove();
}

}*/

/*//функция для вставки возвращенной готовой карточки
function renderCard(nameCardValue, linkCardValue) {
  creatCard(nameCardValue, linkCardValue);
  elementsContainer.prepend(newElementCard); //вставляем на страницу новый блок с карточкой
}*/

/*//Нужно занести в переменные данные из массива initialCards и загрузить на страницу
initialCards.forEach(function (item) {
  const nameCardValue = item.name;
  const linkCardValue = item.link;
  renderCard(nameCardValue, linkCardValue);
});*/
