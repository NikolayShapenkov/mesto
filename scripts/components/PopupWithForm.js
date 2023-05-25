import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super({ popupSelector });
    this._handleSubmitForm = handleSubmitForm;
    this._inputsList = this._popupElement.querySelectorAll(".popup__field");
    this._form = this._popupElement.querySelector(".popup__form");
  }

  close() {
    this._form.reset();
    super.close();
  }

  //Создаем массив объект из данных полей формы в PopupWithForm
  _getInputValues() {
    const arrayInputValue = {};
    this._inputsList.forEach((input) => {
      arrayInputValue[input.name] = input.value;
    });
    this._arrayInputValue = arrayInputValue;
    return arrayInputValue;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      this._handleSubmitForm(evt);
    });
    super.setEventListeners();
  }
}
