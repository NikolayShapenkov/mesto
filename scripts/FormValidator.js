//Класс, настраивающий валидацию полей формы

  export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorActiveClass = data.errorActiveClass;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    ); //все инпуты формы в массив
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    ); //кнопку формы в переменную
    this._inputList = inputList; //Заносим массив инпутов в поле класса
    this._buttonElement = buttonElement; //Заносим кнопку в поле класса
    this._toggleButtonState(); //Запуск метода, который проверяет на валидность поля и меняет статус активности при первом запуске
    this._inputList.forEach((inputListElement) => {
      inputListElement.addEventListener("input", () => {
        //проходим по всем инпутам формы и добавляем обработчик событий, который
        this._isValid(inputListElement); //при вводе каждого символа проверяет на
        this._toggleButtonState();
      });
    });
  }

  _isValid(inputListElement) {
    if (!inputListElement.validity.valid) {
      //если valid false(невалидный), то
      this._showInputError(
        inputListElement,
        inputListElement.validationMessage
      ); //запускает метод, показывающий невалидность визуально
    } else {
      this._hideInputError(inputListElement); //
    }
  }

  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // проверяет на true валидность поля
      // сделай кнопку неактивной
      this.disableSubmitButton();
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", true);
    }
  }

  //Метод ищет среди массива инпутов формы невалид.импут и в этом случае возвращает true
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Добавляет класс неактивности кнопке и атрибут неактивности
  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  //Метод, находящий спан элемента вввода, меняющий цвет полоски при невалидности и выводящий текст ошибки
  _showInputError(inputListElement) {
    const inputErrorContainer = this._formElement.querySelector(
      `.${inputListElement.id}-error`
    ); // Находим в форме элемент спан, куда будет выведено сообщение с ошибкой
    inputListElement.classList.add(this._inputErrorClass); //меняет цвет полоски
    inputErrorContainer.classList.add(this._errorActiveClass); //Делает видимым Спан
    inputErrorContainer.textContent = inputListElement.validationMessage;
  }

  //Метод, находящий спан элемента вввода, меняющий цвет полоски при валидности и скрывающий текст ошибки
  _hideInputError(inputListElement) {
    const inputErrorContainer = this._formElement.querySelector(
      `.${inputListElement.id}-error`
    ); // Находим класс спана для конкретного поля
    inputListElement.classList.remove(this._inputErrorClass);
    inputErrorContainer.classList.remove(this._errorActiveClass);
    inputErrorContainer.textContent = "";
  }
}
