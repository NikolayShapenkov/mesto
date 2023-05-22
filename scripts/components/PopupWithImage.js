export default class PopupWithImage extends Popup {
    constructor( {popupSelector} ) {
        super()
    }


}






export default class Popup {
  constructor( {popupSelector} ) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened"); //класс открытия
    document.addEventListener("keydown", this._handleEscClose);//обработчик по нажатию Esc
    console.log('Добавлен обработчик по Еск');
  }

  close() {
    this._popupElement.classList.remove("popup_opened");//класс закрытия
    document.removeEventListener("keydown", this._handleEscClose);//удаляем обработчик по нажатию Esc
    
    console.log('Срабатывает close()');
  }

  //Логика закрытия по кнопке Esc
   _handleEscClose(event) {
    if (event.key === "Escape") {
    this.close();
    console.log('Логика закрытия по кнопке Esc класс ПОПАП');
  }
  }

  //Логика закрытия при клике на оверлей
  _handleOverlyClose(event) {
    if (event.target === event.currentTarget) {
    this.close();
    console.log('Логика закрытия на оверлей');
  }
  }

  setEventListeners() {
    this._buttonCloseElement = this._popupElement.querySelector('.popup__close');
    this._buttonCloseElement.addEventListener("click", () => {
        this.close();
    });
    this._popupElement.addEventListener("click", () => {
        this._handleOverlyClose(event);
    });
  }

}