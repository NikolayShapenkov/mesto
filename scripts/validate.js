//6ПРОЕКТАНАЯ РАБОТА

//массив с данными для подставки

const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_invalid",
  inputErrorClass: "popup__field_type_error", //класс который стилизует неправильное поле ИЗНАЧАЛЬНО ОТКЛЮЧЕН (полоска становится красной)
  errorActiveClass: "popup__input-error_visible", //класс который делает видимым Спан с ошибкой
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
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

//Функция, которая блокирует кнопку, если инпуты имеют нулевые значения

disableButtonIfInputEmpty = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach(function (inputElement) {
    if (inputElement.value === "") {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    }
  });
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
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", true);
  }
};

enableValidation(formValidationConfig);
