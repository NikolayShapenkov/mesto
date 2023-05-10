import { popupLookCard } from './index.js';
import { popupImageText } from './index.js';
import { popupImagePictures } from './index.js';
import { handlePopupKeydown } from './index.js';

export class Card {
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
  popupImageText.textContent = evt.target.alt; //Выводим название места в попап
  popupImagePictures.src = evt.target.src; //выводим картинку, на которую тапнули
  this._openPopup(evt);
}
/*openPopupLookImage(evt) {
  openPopup(popupLookCard);
  popupImageText.textContent = evt.target.alt; //Выводим название места в попап
  popupImagePictures.src = evt.target.src; //выводим картинку, на которую тапнули
}*/

_openPopup() {
  popupLookCard.classList.add("popup_opened");
  document.addEventListener("keydown", handlePopupKeydown);
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