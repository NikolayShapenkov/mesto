import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { formValidationConfig } from "./validate.js";
import { Card } from "./Card.js";
import { cardListSelector } from "../scripts/utils/constants.js";
import Section from "../scripts/components/Section.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import { selectorPopupProfile } from "../scripts/utils/constants.js";
import { selectorPopupImage } from "../scripts/utils/constants.js";
import PopupWithForm from "./components/PopupWithForm.js";
import { selectorPopupAddCards } from "./utils/constants.js";

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
const popups = Array.from(document.querySelectorAll(".popup"));

window.addEventListener("load", function () {
  page.classList.remove("preload");
}); // удаляю класс preload после полной загрузки страницы, чтобы анимация всплывающих попапов работала

//Cоздаем экземпляр логики попапа для профиля
const openPopupProfile = new PopupWithForm({ popupSelector: selectorPopupProfile });
//openPopupProfile.setEventListeners();//вешаем обработчики на все элементы

//ОТКРЫТИЕ Cобытие по кнопке открытия формы изменения данных профиля
aboutButton.addEventListener("click", () => {
  fieldNameInput.value = profileTitle.textContent; //заполняем поле имени данными со страницы
  fieldDescriptionInput.value = profileText.textContent; //заполняем поле описания данными со страницы
  formProfilValidator.resetValidation();
  openPopupProfile.open();
});

//САБМИТ Создаем экземпляр класса PopupWithForm для формы профиля и передаем в нее фуункцию
const popupProfilCardNew = new PopupWithForm({
  popupSelector: selectorPopupProfile,
  handleSubmitForm: (evt) => {
    evt.preventDefault();

    profileTitle.textContent = fieldNameInput.value; //заполняем имя на странице данными из поля имени
    profileText.textContent = fieldDescriptionInput.value; //заполняем Описание на странице данными из поля описания

    popupProfilCardNew.close();
  },
});

popupProfilCardNew.setEventListeners();


popupProfilCardNew.test();
openPopupProfile.test();
//popupProfilCardNew._getInputValues();



//Создаем экземпляр класса PopupWithForm для формы добавления карты и передаем в нее фуункцию
const popupAddCardNew = new PopupWithForm({
  popupSelector: selectorPopupAddCards,
  handleSubmitForm: (evt) => {
    evt.preventDefault();

    const nameCardValue = popupCardFieldNameInput.value; //заносим в переменную значения данными из поля названия
    const linkCardValue = popupCardFieldLinkInput.value; //заносим в переменную значения данными из поля сылки

    renderCard(nameCardValue, linkCardValue);

    formElementCardValidator.disableSubmitButton();
    //popupProfilCardNew._getInputValues();
    //closePopupForAddCards();
    popupAddCardNew.close();
  },
});

popupAddCardNew.setEventListeners(); //вешаем обработчики на все элементы

//открытие попапа для добавления карточек при нажатии на кнопку
aboutButtonCard.addEventListener("click", (evt) => {
  popupAddCardNew.open();
  formElementCardValidator.resetValidation();
  //formElementCard.reset();
});

// Новая Функция для создания карточек и вставки из формы
function renderCard(nameCardValue, linkCardValue) {
  const arrayCard = [{ name: nameCardValue, link: linkCardValue }]; //забираем данные из формы и создаем массив

  const NewCard = new Section(
    {
      items: arrayCard,
      renderer: (item) => {
        // Создадим экземпляр карточки
        const card = new Card(item, ".element__template");
        // Создаём карточку и возвращаем наружу
        const cardElement = card.generateNewCard();
        NewCard.addItem(cardElement);
      },
    },
    cardListSelector
  );

  NewCard.renderCards();
}

// Новый код для создания экземпляра Section
//console.log(initialCards);
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      // Создадим экземпляр карточки
      const card = new Card(item, ".element__template");
      // Создаём карточку и возвращаем наружу
      const cardElement = card.generateNewCard();
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

cardsList.renderCards();

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





//Вешаем обработчик на форму (обработка данных из формы при клике на ДОБАВИТЬ)
//formPopupAddCardsElement.addEventListener("submit", handleFormCardSubmit);

/*
  //Обработчик при сабмите формы редактир профиля
formElementProfile.addEventListener(
  "submit",
  handleAboutButtonSubmitFormProfile
);*/
/*
// Функция САБМИТА ПРОФИЛЯ для заполнения данных на странице из попапа редактир профиля при сабмите
function handleAboutButtonSubmitFormProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = fieldNameInput.value; //заполняем имя на странице данными из поля имени
  profileText.textContent = fieldDescriptionInput.value; //заполняем Описание на странице данными из поля описания

  //closePopupProfile();
  openPopupProfile.close();
}
*/

/*/*
//Функция обработки открытия попапа профиля
function handleAboutButtonClick() {
  fieldNameInput.value = profileTitle.textContent; //заполняем поле имени данными со страницы
  fieldDescriptionInput.value = profileText.textContent; //заполняем поле описания данными со страницы
  formProfilValidator.resetValidation();
  //openPopup(popupProfile);
  openPopupProfile.open();
}
*/

// Создаем экземпляр попапа для открытия картинки
//export const selectorPopupImage = '.popup-image';//селектор попапа для показа картинки
//console.log(selectorPopupImage);
/*const popupImage = new PopupWithImage( {popupSelector: selectorPopupImage} );
popupImage.setEventListeners();
popupImage.open();*/

/*
//Обрабатываем данные из формы для создания новых карточек.
function handleFormCardSubmit(evt) {
  evt.preventDefault();

  const nameCardValue = popupCardFieldNameInput.value; //заносим в переменную значения данными из поля названия
  const linkCardValue = popupCardFieldLinkInput.value; //заносим в переменную значения данными из поля сылки

  renderCard(nameCardValue, linkCardValue);

  formElementCardValidator.disableSubmitButton();

  //closePopupForAddCards();
  popupAddCardNew.close();
}
*/

//aboutButtonCard.addEventListener("click", openPopupForAddCards);

/*
//Ко всем попапам закрытие по оверлею
popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlyPopupClick);
});
*/

////закрытие попапа для добавления карточек при нажатии на крестик
//buttonCloseCard.addEventListener("click", closePopupForAddCards);

/*
//закрытие попапа для просмотра фото при нажатии на кнопку
buttonCloseImage.addEventListener("click", closePopupLookImage);
*/

//все ЗАКОММЕНТИРОВАННОЕ Уберу после ревью)

//buttonCloseProfilePopup.addEventListener("click", closePopupProfile);

/*
//Функция для открытия попапа общая
export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", handlePopupKeydown);
}
*/

/*
//Новая функция для открытия попапа по кнопке добавления карточки
function openPopupForAddCards() {
  formElementCard.reset();
  formElementCardValidator.resetValidation();
  openPopup(popupAddCard);
}
*/

/*
//Функция для закрытия попапа общая
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlePopupKeydown);
}
*/
/*
//Функция для закрытия попапа редактир профиля
function closePopupProfile() {
  closePopup(popupProfile);
}
*/

/*
//Новая функция для закрытия по кнопке с крестиком
function closePopupForAddCards() {
  closePopup(popupAddCard);
}
*/

//Новая функция для закрытия по клику на крестик над картинкой
/*function closePopupLookImage() {
  closePopup(popupLookCard);
}*/

/*
// Функция для закрытия попапа при клике на оверлей
function handleOverlyPopupClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}
*/

/*
// Функция, закрывающая попап при клике эскейп
export function handlePopupKeydown(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
    console.log('Логика закрытия по кнопке Esc НЕ КЛАСС');
  }
}
*/

// Функция для заполнения данных в полях формы при открытии попапа редактир профиля

//const selectorPopupProfile = '.popup-profile'; //селектор попапа профиля

/*//Новая функция для открытия по клику на картинку
function openPopupLookImage(evt) {
  openPopup(popupLookCard);
  popupImageText.textContent = evt.target.alt; //Выводим название места в попап
  popupImagePictures.src = evt.target.src; //выводим картинку, на которую тапнули
}*/

/*// 20.05 Примет в себя готовую карточку и вставит в разметку +
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
*/

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


//Функция для создания карточки и установки слушателей.
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
}


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

}

//функция для вставки возвращенной готовой карточки
function renderCard(nameCardValue, linkCardValue) {
  creatCard(nameCardValue, linkCardValue);
  elementsContainer.prepend(newElementCard); //вставляем на страницу новый блок с карточкой
}

//Нужно занести в переменные данные из массива initialCards и загрузить на страницу
initialCards.forEach(function (item) {
  const nameCardValue = item.name;
  const linkCardValue = item.link;
  renderCard(nameCardValue, linkCardValue);
})
*/
