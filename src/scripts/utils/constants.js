export const initialCards = [
  {
    name: "Архыз",
    link: "http://vsegda-pomnim.com/uploads/posts/2022-03/1647067311_32-vsegda-pomnim-com-p-reka-mulmuga-foto-34.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
  {
    name: "РЕВЬЮ 🔥👍🙏😊",
    link: "https://sun9-8.userapi.com/impg/EMFzylI5sO9Upo5jHKxZE9tY7AHA1_zsYjAurg/ke-AXEWeXDQ.jpg?size=1620x2160&quality=96&sign=bcd0f81dfef278f9eb042825ac693c54&type=album",
  },
];

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