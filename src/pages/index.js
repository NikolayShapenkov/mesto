import "./index.css"; // добавьте импорт главного файла стилей
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
  popupLookCard,
  fieldNameInput,
  fieldDescriptionInput,
} from "../scripts/utils/constants.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
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
const popupImage = new PopupWithImage({ popupSelector: selectorPopupImage });
popupImage.setEventListeners();

const handleCardClick = (text, image) => {
  popupImage.open(text, image);
};

//САБМИТ Создаем экземпляр класса PopupWithForm для формы профиля и передаем в нее фуункцию
const popupEditProfile = new PopupWithForm({
  popupSelector: selectorPopupProfile,
  handleSubmitForm: (inputValues) => {
    userInfo.setUserInfo(inputValues.firstname, inputValues.description);
    popupEditProfile.close();
  },
});

//ОТКРЫТИЕ Cобытие по кнопке открытия формы изменения данных профиля
aboutButton.addEventListener("click", () => {
  userInfo.getUserInfo();

  const dataInputs = userInfo.getUserInfo();
  fieldNameInput.value = dataInputs.firstName; //заполняем поле имени данными со страницы
  fieldDescriptionInput.value = dataInputs.description;//заполняем поле описание данными со страницы

  formProfilValidator.resetValidation();
  popupEditProfile.open();
});

popupEditProfile.setEventListeners();

//Создаем новый экземпляр класса UserInfo (для работы с вставкой текстов на страницу, со страницы, в форму)
const userInfo = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector,
});

//Создаем экземпляр класса PopupWithForm для формы добавления карты и передаем в нее фуункцию
const popupAddCardNew = new PopupWithForm({
  popupSelector: selectorPopupAddCards,
  handleSubmitForm: (inputValues) => {
    renderCard([inputValues]);
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

//Уберу после ревью, спасибо)
/*function setUserInfoForInput() {
        fieldNameInput.value = this._dataUserProfile.firstName; //заполняем поле имени данными со страницы
        fieldDescriptionInput.value = this._dataUserProfile.description;
    }*/
