import Popup from "./Popup.js";
const formElementCard = document.querySelector(".popup-cards__form");

export default class PopupWithForm extends Popup {
    constructor( {popupSelector, handleSubmitForm}) {
        super({popupSelector});
        this._handleSubmitForm = handleSubmitForm;
        this._inputsList = this._popupElement.querySelectorAll('.popup__field');
        this._form = this._popupElement.querySelector('.popup__form');
    }

    close() {
    this._getInputValues();
    this._form.reset();
    super.close();
  }


    _getInputValues() {
        const arrayInputValue = {}
        this._inputsList.forEach(input => {
        arrayInputValue[input.name] = input.value;
        });
        console.log(arrayInputValue);
        return arrayInputValue;
    };

    setEventListeners() {
    console.log('Сработал setEventListener в PopupWithForm')

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

    this._popupElement.addEventListener("submit", (evt) => {
        this._handleSubmitForm(evt);
    });
  }

  test() {
    console.log(this._inputsList);
    //console.log(arrayInputValue);
  }

}