//массив с данными для подставки
export const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_invalid",
  inputErrorClass: "popup__field_type_error", //класс который стилизует неправильное поле ИЗНАЧАЛЬНО ОТКЛЮЧЕН (полоска становится красной)
  errorActiveClass: "popup__input-error_visible", //класс который делает видимым Спан с ошибкой
};

export const cardListSelector = ".elements__group";
export const selectorPopupProfile = ".popup-profile"; //селектор попапа профиля
export const selectorPopupImage = ".popup-image";
export const selectorPopupAddCards = ".popup-cards";
export const selectorPopupDelete = ".popup-delete";
export const selectorPopupAvatar = ".popup-avatar";

export const popupNewAvatar = document.querySelector(".popupAvatar__form");

export const popupProfile = document.querySelector(".popup-profile");
export const formElementProfile = popupProfile.querySelector(".popup__form"); //форма в попапе редактирования профиля
export const fieldNameInput = formElementProfile.querySelector(
  ".popup__field_type_name"
); //Поле для имени
export const fieldDescriptionInput = formElementProfile.querySelector(
  ".popup__field_type_description"
); //поле для описания

export const profileNameSelector = ".profile__title";
export const profileDescriptionSelector = ".profile__text";
export const page = document.querySelector(".page"); //ищу элемент с классом preload, отвечающий за отключение transition при загрузке страницы (класс добавлен, чтобы попап не высвечивался на доли секунд при загрузке страницы)
export const aboutButton = document.querySelector(".profile__edit-button");
export const formElementCard = document.querySelector(".popup-cards__form");
export const aboutButtonCard = document.querySelector(".profile__add-button"); //кнопка добавления карточек
export const popupLookCard = document.querySelector(".popup-image"); //Попап для просмотра карточек
export const avatar = document.querySelector(".profile__image-container");
export const avatarImg = avatar.querySelector(".profile__image");

//Опции Апи
export const option = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66/",
  headers: "application/json",
  password: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
};
