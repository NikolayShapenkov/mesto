import "./index.css"; // добавьте импорт главного файла стилей
import {
  initialCards,
  formValidationConfig,
  selectorPopupAddCards,
  profileDescriptionSelector,
  profileNameSelector,
  aboutButton,
  aboutButtonCard,
  formElementProfile,
  formElementCard,
  page,
  popupLookCard,
  fieldNameInput,
  fieldDescriptionInput,
} from "../scripts/utils/constants.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import {
  cardListSelector,
  selectorPopupProfile,
  selectorPopupImage,
  selectorPopupDelete
} from "../scripts/utils/constants.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete";
import Api from "../scripts/components/Api.js";


import { UserRequest, requestDataCards, loadingDataProfile, loadingDataCards} from "../scripts/components/Api.js";

export const popupImageText = popupLookCard.querySelector(".popup-image__text"); //Картинка в попапе для просмотра фото

window.addEventListener("load", function () {
  page.classList.remove("preload");
}); // удаляю класс preload после полной загрузки страницы, чтобы анимация всплывающих попапов работала

const userData = {name: 'Николай', description: 'Техспец онлайн-школ'};

//Создаем экзкмпляр класса для формы подтвекрждениия удаления
  const popupDelete = new PopupWithDelete({ popupSelector: selectorPopupDelete });
  popupDelete.setEventListeners();


//Обработчик клика на УДАЛИТЬ
function handleButtonDeleteClick() {
  popupDelete.open();
}

//Функция для открытия карты при передаче в класс Card
const popupImage = new PopupWithImage({ popupSelector: selectorPopupImage });
popupImage.setEventListeners();

const handleCardClick = (text, image) => {
  popupImage.open(text, image);
};

//САБМИТ Создаем экземпляр класса PopupWithForm для формы профиля и передаем в нее фуункцию саббмита
const popupEditProfile = new PopupWithForm({
  popupSelector: selectorPopupProfile,
  handleSubmitForm: (inputValues) => {
    api.loadingDataProfile(inputValues)
  .then(res => res.json())
  .then((inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.about);
    console.log(inputValues); //[{}, {}, {}...]
  })
  .catch((res) => {
    console.log(res)
  });
    popupEditProfile.close();
  },
});

//ОТКРЫТИЕ Cобытие по кнопке открытия формы изменения данных профиля
aboutButton.addEventListener("click", () => {
  userInfo.getUserInfo();

  const dataInputs = userInfo.getUserInfo();
  fieldNameInput.value = dataInputs.firstName; //заполняем поле имени данными со страницы
  fieldDescriptionInput.value = dataInputs.description;//заполняем поле описание данными со страницы

  formProfilValidator.resetValidation();
  popupEditProfile.open();
});

popupEditProfile.setEventListeners();

//Создаем новый экземпляр класса UserInfo (для работы с вставкой текстов на страницу, со страницы, в форму)
const userInfo = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector,
});

//Создаем экземпляр класса PopupWithForm для формы добавления карты и передаем в нее фуункцию
const popupAddCardNew = new PopupWithForm({
  popupSelector: selectorPopupAddCards,
  handleSubmitForm: (inputValues) => {
    api.loadingDataCards(inputValues)
  .then(res => res.json())
  .then((inputValues) => {
    console.log(inputValues); //[{}, {}, {}...]
    console.log('Айди', inputValues.owner._id);
    renderCard([inputValues], inputValues.owner._id);
  })
  .catch((res) => {
    console.log(res)
  });
    //renderCard([inputValues]);
    formElementCardValidator.disableSubmitButton();
    popupAddCardNew.close();
  },
});

popupAddCardNew.setEventListeners(); //вешаем обработчики на все элементы

//открытие попапа для добавления карточек при нажатии на кнопку
aboutButtonCard.addEventListener("click", (evt) => {
  popupAddCardNew.open();
  formElementCardValidator.resetValidation();
});

// Функция для создания карточек и вставки из формы
function renderCard(arrayAddNewCards, ownerId) {
  arrayAddNewCards.reverse();
  //console.log('Айди в рендере', inputValues.owner._id);
  const NewCard = new Section(
    {
      items: arrayAddNewCards,
      renderer: (item, amount) => { 
        const card = new Card(item, ".element__template", handleCardClick, handleButtonDeleteClick);
        // Создаём карточку и возвращаем наружу
        const cardElement = card.generateNewCard(amount);
        NewCard.addItem(cardElement);
      },
    },
    cardListSelector
  );

  NewCard.renderCards();
}
renderCard(initialCards);

//Экземпляр для валидации формы профиля
const formProfilValidator = new FormValidator(
  formValidationConfig,
  formElementProfile
);
formProfilValidator.enableValidation();

//Экземпляр для валидации формы добавления карточек
const formElementCardValidator = new FormValidator(
  formValidationConfig,
  formElementCard
);
formElementCardValidator.enableValidation();

//Создаем экземпляр класса Api

const option = {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66/",
    headers: "",
    password: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
}

const api = new Api(option);

//Запроса инф-ции о пользователе на сервер
api.getUserDataApi()
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    return result
  })
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about) // вызываем метод из класса setUserInfo, вставляем данные с сервера на страницу
    document.querySelector('.profile__image').src = data.avatar; //вставляем фото профиля с сервера
  })
  .catch((res) => {
    console.log(res)
  });

  //Запрашиваем массив карточек и вставляем их в разметку
 api.getDataCards()
 .then(res => res.json())
  .then((result) => {
    console.log(result); //[{}, {}, {}...]
    const cards = result;
    renderCard(cards);// для вставки используем готовую функцию
  })
  .catch((res) => {
    console.log(res)
  });

  /*
  // Редактируем данные профиля на сервер (пока не привязана к форме)

  const userData = {name: 'Николай', description: 'Техспециалист ОШ'};

  api.loadingDataProfile(userData)
  .then(res => res.json())
  .then((result) => {
    console.log(result); //[{}, {}, {}...]
  })
  .catch((res) => {
    console.log(res)
  });
  */












/*
//Запрашиваем данные профиля и вставляем их в разметку
UserRequest()
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    return result
  })
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about) // вызываем метод из класса setUserInfo, вставляем данные с сервера на страницу
    document.querySelector('.profile__image').src = data.avatar; //вставляем фото профиля с сервера
  })
  .catch((res) => {
    console.log(res)
  });

  //Запрашиваем массив карточек и вставляем их в разметку
  requestDataCards()
  .then(res => res.json())
  .then((result) => {
    console.log(result); //[{}, {}, {}...]
    const cards = result;
    renderCard(cards);// для вставки используем готовую функцию
  })
  .catch((res) => {
    console.log(res)
  });
*/
  //Объект для теста

  //const userData = {name: 'Николай', description: 'Технический специалист'};

  /*
  // Отправляем данные профиля на сервер (пока не привязана к форме)
  loadingDataProfile(userData)
  .then(res => res.json())
  .then((result) => {
    console.log(result); //[{}, {}, {}...]
  })
  .catch((res) => {
    console.log(res)
  });
  */

  //Объект для теста

  
  //Загружаем карточку на cервер
  //const dataCards = {name: 'Ффффухх', link: 'https://m.fishki.net/upload/users/2021/02/12/1779359/34e66ded0ec312d472a4070c5640c28d.jpg'};
/*
  loadingDataCards(dataCards)
  .then(res => res.json())
  .then((result) => {
    console.log(result); //[{}, {}, {}...]
  })
  .catch((res) => {
    console.log(res)
  });
*/
