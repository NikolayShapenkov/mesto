export const cardListSelector = '.elements__group';
export const selectorPopupProfile = '.popup-profile'; //селектор попапа профиля
export const selectorPopupImage = '.popup-image';
export const selectorPopupAddCards = '.popup-cards';
export const popupProfile = document.querySelector(".popup-profile");
export const formElementProfile = popupProfile.querySelector(".popup__form"); //форма в попапе редактирования профиля
export const fieldNameInput = formElementProfile.querySelector(".popup__field_type_name"); //Поле для имени
export const fieldDescriptionInput = formElementProfile.querySelector(
  ".popup__field_type_description"
); //поле для описания
export const profileNameSelector = '.profile__title';
export const profileDescriptionSelector = '.profile__text';