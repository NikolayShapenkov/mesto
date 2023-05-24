
// Логика для открытия и закрытия попапа, нужно только в него передать параметры селектора
export default class Popup {
  constructor( {popupSelector} ) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened"); //класс открытия
    document.addEventListener("keydown", this._handleEscClose);//обработчик по нажатию Esc
    console.log('работает open в Popup');
  }

  close() {
    this._popupElement.classList.remove("popup_opened");//класс закрытия
    document.removeEventListener("keydown", this._handleEscClose);//удаляем обработчик по нажатию Esc
    
    console.log('Срабатывает close() в Popup');
  }

  //Логика закрытия по кнопке Esc
   _handleEscClose = (event) => {
    if (event.key === "Escape") {
    this.close();
    console.log('Логика закрытия по кнопке Esc класс ПОПАП');
  }
  }

  setEventListeners() {
    console.log('Сработал setEventListener в popup')

    this._buttonCloseElement = this._popupElement.querySelector('.popup__close');

    this._buttonCloseElement.addEventListener("click", () => {
        this.close();
    });
    this._popupElement.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
    this.close();
    console.log('Логика закрытия на оверлей');
    }
  });
}
}

