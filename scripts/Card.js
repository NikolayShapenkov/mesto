export class Card {
  constructor(data, temlateSelector, handleCardClick) {
    this.handleCardClick = handleCardClick;
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
    this._buttonDeleteCard =
      this._cardCloneElement.querySelector(".element__delete"); //кнопка для удаления карточки в новой разметке
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
    this._buttonDeleteCard.addEventListener("click", () => {
      this._handleClickButtonDelete();
    });
    this._cardImage.addEventListener("click", () => {
      this.handleCardClick(this._text, this._image);
    }); //вешаем обработчик клика на картинку для открытия попапа
  }

  _handleClickLike() {
    this._buttonLike.classList.toggle("element__vector_active");
  }

  _handleClickButtonDelete() {
    this._buttonDeleteCard.closest(".element");
    this._cardCloneElement.remove();
  }
}
