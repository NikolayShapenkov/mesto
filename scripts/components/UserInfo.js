export default class PopupWithImage extends Popup {
    constructor( {popupSelector} ) {
        super({popupSelector});
        this.popupImageText = this._popupElement.querySelector('.popup-image__text'); //текст в попапе
        this.popupImagePictures = this._popupElement.querySelector('.popup-image__picture');//картинка в попапе
    }

    open(text, image) {
      this.popupImageText.textContent = text;
      this.popupImagePictures.src = image;
      this.popupImagePictures.alt = text;
      super.open();
      console.log('Сработлат доработанный опен в PopupWithImage');
    }
}