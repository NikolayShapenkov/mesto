import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super({ popupSelector });
    this._submitForm = handleSubmitForm;
    this._inputsList = this._popupElement.querySelectorAll(".popup__field");
    this._form = this._popupElement.querySelector(".popup__form");
    this._buttonSubmit = this._form.querySelector(".popup__save"); //Кнопка саббмита в форме
  }

  close() {
    this._form.reset();
    super.close();
  }

  //Создаем массив объект из данных полей формы в PopupWithForm
  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    this._inputValues = inputValues;
    return inputValues;
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._getInputValues(), this._buttonSubmit); //пробрасываем кнопку
  };

  setEventListeners() {
    this._popupElement.addEventListener("submit", this._handleSubmitForm);
    super.setEventListeners();
  }
}
