export class Card {
  constructor(data, temlateSelector, handleCardClick, handleButtonDeleteClick) {
    this.handleButtonDeleteClick = handleButtonDeleteClick;
    this.handleCardClick = handleCardClick;
    this._image = data.link;
    this._text = data.name;
    this._selector = temlateSelector; //здесь будет разметка селектора из темплейт
    this.owner_Id = data.owner._id;
  }

  _getTemplate() {
    const cloneCard = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true); //клонируем карточку из темплейт
    return cloneCard;
  }

  generateNewCard(amount) {
    this._cardCloneElement = this._getTemplate(); //записываем разметку новой карточки в перем
    this._cardImage = this._cardCloneElement.querySelector(".element__image");
    this._buttonLike = this._cardCloneElement.querySelector(".element__vector");
    this._likeSpan = this._cardCloneElement.querySelector(".element__span");
    this._buttonDeleteCard =
      this._cardCloneElement.querySelector(".element__delete"); //кнопка для удаления карточки в новой разметке
    this._setEventListeners();
    const cloneCardImage = this._cardImage; //находим картинку в клоне карты
    cloneCardImage.src = this._image; // Меняем в новой карточке данные, берем их из свойств класса
    cloneCardImage.alt = this._text;
    this._cardCloneElement.querySelector(".element__text").textContent =
      this._text; //! Меняем в новой карточке данные, берем их из попапа
    this._likeSpan.textContent = amount;
       if (this.owner_Id !== '5346a78775339fb359a1af5c') {
        console.log('Не моя карточка');
        this._buttonDeleteCard.remove();
       }
    return this._cardCloneElement;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleClickLike();
    });
      this._buttonDeleteCard.addEventListener("click", () => {
      this.handleButtonDeleteClick();

    //this._buttonDeleteCard.addEventListener("click", () => {
    //this._handleClickButtonDelete();
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

  //Метод для удаления иконки УДАЛИТЬ не в моих карточках
  _deleteButtonDelete() {
    this._buttonDeleteCard.remove();
  }
}
