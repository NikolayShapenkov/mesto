export class Card {
  constructor({
    data,
    temlateSelector,
    handleCardClick, //открытие картинки при клике
    handleButtonDeleteClick, //удаление по клику
    handleClickLike, //Функция добавления лайка
    handleDeleteLike, //Функция удаления лайка
    myId, //мой айди
  }) {
    (this.myId = myId), (this.handleDeleteLike = handleDeleteLike);
    this.handleClickLike = handleClickLike;
    this.handleButtonDeleteClick = handleButtonDeleteClick;
    this.handleCardClick = handleCardClick;
    this._image = data.link;
    this._text = data.name;
    this._selector = temlateSelector; //здесь будет разметка селектора из темплейт
    this.owner_Id = data.owner._id;
    this._id = data._id;
    this._dataLikes = data.likes; //массив с данными о лайках загружаемой карточки
    this._amount = data.likes.length;
  }

  _getTemplate() {
    const cloneCard = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true); //клонируем карточку из темплейт
    return cloneCard;
  }

  //Метод удаления карточки при Саббмите удаления
  handleClickButtonDelete() {
    this._cardCloneElement.remove();
  }

  generateNewCard() {
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
    this.counter(this._amount, this._dataLikes);

    //Убираем иконки удаления не на своих карточках
    if (this.owner_Id !== this.myId) {
      this._buttonDeleteCard.remove();
    }

    //Красим лайк, если уже ставили
    this._ifMyLike();

    return this._cardCloneElement;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", (evt) => {
      this._handleClickLike(evt);
      this._handleDeleteLike(evt);
    });

    this._buttonDeleteCard.addEventListener("click", () => {
      //Кнопка удаления карточки
      this.handleButtonDeleteClick(this._id, this);
    });

    this._cardImage.addEventListener("click", () => {
      this.handleCardClick(this._text, this._image);
    }); //вешаем обработчик клика на картинку для открытия попапа
  }

  //Если лайка не стоит, сработает этот метод
  _handleClickLike(evt) {
    const myLike = this._dataLikes.some((item) => {
      return item._id === this.myId;
    });
    if (!myLike) {
      this.handleClickLike(this._id, evt);
    }
  }

  //Если лайк есть, сработает этот метод
  _handleDeleteLike(evt) {
    const myLike = this._dataLikes.some((item) => {
      return item._id === this.myId;
    });
    if (myLike) {
      this.handleDeleteLike(this._id, evt);
    }
  }

  //Метод для удаления иконки УДАЛИТЬ не в моих карточках
  _deleteButtonDelete() {
    this._buttonDeleteCard.remove();
  }

  //функция, проверяющая мои лайки при загрузке и окрашивающая их.
  _ifMyLike() {
    const myLike = this._dataLikes.some((item) => {
      return item._id === this.myId;
    });
    if (myLike) {
      this._buttonLike.classList.add("element__vector_active");
    }
  }

  //Счетчик данных и изменятель
  counter(amount, dataLikes) {
    this._likeSpan.textContent = amount;
    this._dataLikes = dataLikes;
  }

  //Метод для изменения счетчика лайков ПРИ КЛИКЕ
  counterOnklick(res) {
    this.counter(res.likes.length, res.likes);
  }
}
