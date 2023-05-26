import './index.css'; // добавьте импорт главного файла стилей 
import {
  initialCards,
  formValidationConfig,
  selectorPopupAddCards,
  profileDescriptionSelector,
  profileNameSelector,
  aboutButton,
  aboutButtonCard,
  formElementProfile,
  formElementCard,
  page,
  popupLookCard
} from "../scripts/utils/constants.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import {
  cardListSelector,
  selectorPopupProfile,
  selectorPopupImage,
} from "../scripts/utils/constants.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
export const popupImageText = popupLookCard.querySelector(".popup-image__text"); //Картинка в попапе для просмотра фото

window.addEventListener("load", function () {
  page.classList.remove("preload");
}); // удаляю класс preload после полной загрузки страницы, чтобы анимация всплывающих попапов работала

//Функция для открытия карты при передаче в класс Card
const popupImage = new PopupWithImage( {popupSelector: selectorPopupImage} );
popupImage.setEventListeners();

const handleCardClick = (text, image) => {
    popupImage.open(text, image);
  };

//САБМИТ Создаем экземпляр класса PopupWithForm для формы профиля и передаем в нее фуункцию
const popupProfilCardNew = new PopupWithForm({
  popupSelector: selectorPopupProfile,
  handleSubmitForm: (evt) => {
    evt.preventDefault();

    const arrayInputValue = popupProfilCardNew._getInputValues(); //при саббмите формируем объект с данными из заполненной формы

    userInfo.setUserInfo(
      arrayInputValue.firstname,
      arrayInputValue.description
    );

    popupProfilCardNew.close();
  },
});

//ОТКРЫТИЕ Cобытие по кнопке открытия формы изменения данных профиля
aboutButton.addEventListener("click", () => {
  userInfo.getUserInfo();
  userInfo.setUserInfoForInput();
  formProfilValidator.resetValidation();
  popupProfilCardNew.open();
});

popupProfilCardNew.setEventListeners();

//Создаем новый экземпляр класса UserInfo (для работы с вставкой текстов на страницу, со страницы, в форму)
const userInfo = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector,
});

//Создаем экземпляр класса PopupWithForm для формы добавления карты и передаем в нее фуункцию
const popupAddCardNew = new PopupWithForm({
  popupSelector: selectorPopupAddCards,
  handleSubmitForm: (evt) => {
    evt.preventDefault();
    const objectWithNewData = popupAddCardNew._getInputValues();
    renderCard([objectWithNewData]);
    formElementCardValidator.disableSubmitButton();
    popupAddCardNew.close();
  },
});

popupAddCardNew.setEventListeners(); //вешаем обработчики на все элементы

//открытие попапа для добавления карточек при нажатии на кнопку
aboutButtonCard.addEventListener("click", (evt) => {
  popupAddCardNew.open();
  formElementCardValidator.resetValidation();
});

// Функция для создания карточек и вставки из формы
function renderCard(arrayAddNewCards) {
  const NewCard = new Section(
    {
      items: arrayAddNewCards,
      renderer: (item) => {
        // Создадим экземпляр карточки
        const card = new Card(item, ".element__template", handleCardClick);
        // Создаём карточку и возвращаем наружу
        const cardElement = card.generateNewCard();
        NewCard.addItem(cardElement);
      },
    },
    cardListSelector
  );

  NewCard.renderCards();
}
renderCard(initialCards);

//Экземпляр для валидации формы профиля
const formProfilValidator = new FormValidator(
  formValidationConfig,
  formElementProfile
);
formProfilValidator.enableValidation();

//Экземпляр для валидации формы добавления карточек
const formElementCardValidator = new FormValidator(
  formValidationConfig,
  formElementCard
);
formElementCardValidator.enableValidation();





// УБЕРУ ПОСЛЕ РЕВЬЮ))
/*
// Новый код для создания экземпляра Section
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

//Создаем второй экзнмпляр Section для приема массива???

/*
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
*/

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
