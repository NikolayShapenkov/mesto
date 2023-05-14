//6ПРОЕКТАНАЯ РАБОТА

//массив с данными для подставки
export const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_invalid",
  inputErrorClass: "popup__field_type_error", //класс который стилизует неправильное поле ИЗНАЧАЛЬНО ОТКЛЮЧЕН (полоска становится красной)
  errorActiveClass: "popup__input-error_visible", //класс который делает видимым Спан с ошибкой
};
// "Файл можно переименовать в constants.js и хранить в нем эту и подобные константы" - Переименую в ПР8, там как раз эта тема, спасибо!

//Уберу после ревью))
/*//Класс, настраивающий валидацию полей формы
class FormValidator {
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

/*const formProfilValidator = new FormValidator(
  formValidationConfig,
  formElementProfile
); //создаю экземпляр карда
formProfilValidator.enableValidation();

const formElementCardValidator = new FormValidator(
  formValidationConfig,
  formElementCard
); //создаю экземпляр карда
formElementCardValidator.enableValidation();*/

//Уберу после ревью)
/*const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  console.log(formList);
  formList.forEach(function (formElement) {
    setEventListeners(formElement, rest);
  });
};

//Функция, принимающая форму и вешающая обработчики и делающая сразу неактивной кнопку, если есть невалидный инпут
const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

//Метод, который блокирует кнопку
const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};

//Функция, добавляющая класс к элементу, чтобы стилизовать невалидное поле и делающая контейнер с ошибкой видимым
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorActiveClass }
) => {
  const inputErrorContainer = formElement.querySelector(
    `.${inputElement.id}-error`
  ); // Находим класс спана для конкретного поля
  inputElement.classList.add(inputErrorClass);
  inputErrorContainer.classList.add(errorActiveClass);
  inputErrorContainer.textContent = errorMessage;
};

//Функция, удаляющая класс у элемента
const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorActiveClass }
) => {
  const inputErrorContainer = formElement.querySelector(
    `.${inputElement.id}-error`
  ); // Находим класс спана для конкретного поля
  inputElement.classList.remove(inputErrorClass);
  inputErrorContainer.classList.remove(errorActiveClass);
  inputErrorContainer.textContent = "";
};

//функция, проверяющая валидность и удаляющая или добавляющая класс для стилизации невалидного поля
const isValid = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

//Функция, пербирающая инпуты формы и выдающая true, если находит невалидное поле.
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция, которая делает кнопку неактивной
const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass, ...rest }
) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", true);
  }
};

enableValidation(formValidationConfig);*/
