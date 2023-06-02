import "./index.css"; // добавьте импорт главного файла стилей
import {
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
  avatar,
  popupNewAvatar,
  option,
} from "../scripts/utils/constants.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import {
  cardListSelector,
  selectorPopupProfile,
  selectorPopupImage,
  selectorPopupDelete,
  selectorPopupAvatar,
} from "../scripts/utils/constants.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete";
import Api from "../scripts/components/Api.js";

export const popupImageText = popupLookCard.querySelector(".popup-image__text"); //Картинка в попапе для просмотра фото
window.addEventListener("load", function () {
  page.classList.remove("preload");
}); // удаляю класс preload после полной загрузки страницы, чтобы анимация всплывающих попапов работала

//Создаем экзкмпляр класса для формы подтвекрждениия удаления
const popupDelete = new PopupWithDelete({
  popupSelector: selectorPopupDelete,
  handleSubmitForm: (_id, card) => {
    api
      .getDeleteCardById(_id)
      .then((result) => {
        card.handleClickButtonDelete();
        popupDelete.close();
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
popupDelete.setEventListeners();

//Создаем экземпляр класса для формы смены аватарки
const popupAddAvatar = new PopupWithForm({
  popupSelector: selectorPopupAvatar,
  handleSubmitForm: (inputValues, buttonSubmit) => {
    renderLoading(buttonSubmit, "Сохранение...");
    api
      .getAddAvatar(inputValues.link)
      .then(() => {
        userInfo.setUserAvatar(inputValues.link);
        popupAddAvatar.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((res) => {
        renderLoading(buttonSubmit, "Сохранить");
      });
  },
});

popupAddAvatar.setEventListeners();

//ОТКРЫТИЕ попапа смены аватара
avatar.addEventListener("click", () => {
  popupAddAvatar.open();
  formElementAvatarValidator.resetValidation();
});

//Функция для открытия карты при передаче в класс Card
const popupImage = new PopupWithImage({ popupSelector: selectorPopupImage });

popupImage.setEventListeners();

const handleCardClick = (text, image) => {
  popupImage.open(text, image);
};

//САБМИТ Создаем экземпляр класса PopupWithForm для формы профиля и передаем в нее фуункцию саббмита
const popupEditProfile = new PopupWithForm({
  popupSelector: selectorPopupProfile,
  handleSubmitForm: (inputValues, buttonSubmit) => {
    renderLoading(buttonSubmit, "Сохранение...");
    api
      .loadingDataProfile(inputValues)
      .then((inputValues) => {
        userInfo.setUserInfo(inputValues.name, inputValues.about);
        popupEditProfile.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((res) => {
        renderLoading(buttonSubmit, "Сохранить");
      });
  },
});

//ОТКРЫТИЕ Cобытие по кнопке открытия формы изменения данных профиля
aboutButton.addEventListener("click", () => {
  userInfo.getUserInfo();
  const dataInputs = userInfo.getUserInfo();
  fieldNameInput.value = dataInputs.firstName; //заполняем поле имени данными со страницы
  fieldDescriptionInput.value = dataInputs.description; //заполняем поле описание данными со страницы
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
  handleSubmitForm: (inputValues, buttonSubmit) => {
    renderLoading(buttonSubmit, "Сохранение...");
    api
      .loadingDataCards(inputValues)
      .then((inputValues) => {
        newCard.addItem(
          creatCard(inputValues, inputValues.owner._id, inputValues.owner._id)
        );
        popupAddCardNew.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((res) => {
        renderLoading(buttonSubmit, "Создать");
      });
    formElementCardValidator.disableSubmitButton();
  },
});

popupAddCardNew.setEventListeners(); //вешаем обработчики на все элементы

//открытие попапа для добавления карточек при нажатии на кнопку
aboutButtonCard.addEventListener("click", (evt) => {
  popupAddCardNew.open();
  formElementCardValidator.resetValidation();
});

// ИЗ РАЗДЕЛЕННОЙ ФУНКЦИИ. Забирает объект карточки и возвращает готовую карту для вставки
const creatCard = (item, _id, myID) => {
  const card = new Card({
    data: item,
    temlateSelector: ".element__template",
    handleCardClick: handleCardClick,
    handleButtonDeleteClick: (_id, card) => {
      popupDelete.open(_id, card);
    },
    handleClickLike: (_id, evt) => {
      api
        .getAddLike(_id)
        .then((res) => {
          evt.target.classList.toggle("element__vector_active");
          card.counterOnklick(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDeleteLike: (_id, evt) => {
      api
        .getDeleteLike(_id)
        .then((result) => {
          let quantityLike = result.likes.length; //вычисляем сумму лайков из получ данных
          evt.target.classList.toggle("element__vector_active");
          const dataLikes = result.likes;
          card.counter(quantityLike, dataLikes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    myId: myID,
  });
  return card.generateNewCard();
};

const newCard = new Section(
  {
    renderer: (item, _id, myID) => {
      newCard.addItem(creatCard(item, _id, myID));
    },
  },
  cardListSelector
);

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

//Экземпляр валидации формы смены Аватара
const formElementAvatarValidator = new FormValidator(
  formValidationConfig,
  popupNewAvatar
);
formElementAvatarValidator.enableValidation();

//Создаем экземпляр класса Api
const api = new Api(option);

Promise.all([api.getDataCards(), api.getUserDataApi()])
  .then(([result, data]) => {
    userInfo.setUserInfo(data.name, data.about); // вызываем метод из класса setUserInfo, вставляем данные с сервера на страницу
    userInfo.setUserAvatar(data.avatar);
    const myID = data._id;
    const cards = result;
    newCard.renderCards(cards, myID); // для вставки используем готовую функцию
  })
  .catch((err) => {
    console.log(err);
  });

//Функция для улучшения UX
function renderLoading(buttonSubmit, messageText) {
  buttonSubmit.textContent = messageText;
}
