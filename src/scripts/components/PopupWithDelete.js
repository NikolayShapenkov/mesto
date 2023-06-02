import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super({ popupSelector });
    this._submitForm = handleSubmitForm;
  }

  open = (_id, card) => {
    this._id = _id;
    this.card = card;
    super.open();
  };

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._id, this.card);
  };

  setEventListeners() {
    this._popupElement.addEventListener("submit", this._handleSubmitForm);
    super.setEventListeners();
  }
}
