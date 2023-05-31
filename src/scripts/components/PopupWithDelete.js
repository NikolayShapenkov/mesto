import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  open = () => {
    console.log('сработка')
    super.open();
  }

}