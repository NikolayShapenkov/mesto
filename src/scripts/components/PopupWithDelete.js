import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super({ popupSelector });
    this._submitForm = handleSubmitForm;
  }

  open = (_id, buttonDeleteCard, cardCloneElement) => {
    this._id = _id;
    this._buttonDeleteCard = buttonDeleteCard;
    this._cardCloneElement = cardCloneElement;
    super.open();
  };

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitForm(this._id, this._buttonDeleteCard, this._cardCloneElement);
  };

  setEventListeners() {
    this._popupElement.addEventListener("submit", this._handleSubmitForm);
    super.setEventListeners();
  }
}
