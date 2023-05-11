import { popupLookCard } from "./index.js";
import { popupImageText } from "./index.js";
import { popupImagePictures } from "./index.js";
//import { handlePopupKeydown } from './index.js';
import { openPopup } from "./index.js";

export class Card {
  constructor(data, temlateSelector) {
    this._image = data.link;
    this._text = data.name;
    this._selector = temlateSelector; //здесь будет разметка селектора из темплейт
  }

  _getTemplate() {
    const cloneCard = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true); //клонируем карточку из темплейт
    return cloneCard;
  }

  generateNewCard() {
    this._cardCloneElement = this._getTemplate(); //записываем разметку новой карточки в перем
    this._cardImage = this._cardCloneElement.querySelector(".element__image");
    this._buttonLike = this._cardCloneElement.querySelector(".element__vector");
    this._setEventListeners();
    const cloneCardImage = this._cardImage; //находим картинку в клоне карты
    cloneCardImage.src = this._image; // Меняем в новой карточке данные, берем их из свойств класса
    cloneCardImage.alt = this._text;
    this._cardCloneElement.querySelector(".element__text").textContent =
      this._text; //! Меняем в новой карточке данные, берем их из попапа
    return this._cardCloneElement;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleClickLike();
    });
    this._cardCloneElement
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleClickButtonDelete();
      });
    this._cardImage.addEventListener("click", () => {
      this._openPopupLookImage();
    }); //вешаем обработчик клика на картинку для открытия попапа
  }

  _openPopupLookImage() {
    popupImageText.textContent = this._text; //Выводим название места в попап
    popupImagePictures.src = this._image; //выводим картинку, на которую тапнули
    openPopup(popupLookCard);
  }

  _handleClickLike() {
    this._buttonLike.classList.toggle("element__vector_active");
  }

  _handleClickButtonDelete() {
    const elementCardForDelete = this._cardCloneElement
      .querySelector(".element__delete")
      .closest(".element");
    this._cardCloneElement.remove();
  }
}
