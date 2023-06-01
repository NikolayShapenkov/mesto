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
  avatar,
  popupNewAvatar,
  avatarImg,
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
import Popup from "../scripts/components/Popup.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete";
import Api from "../scripts/components/Api.js";

export const popupImageText = popupLookCard.querySelector(".popup-image__text"); //Картинка в попапе для просмотра фото

window.addEventListener("load", function () {
  page.classList.remove("preload");
}); // удаляю класс preload после полной загрузки страницы, чтобы анимация всплывающих попапов работала

//Создаем экзкмпляр класса для формы подтвекрждениия удаления
const popupDelete = new PopupWithDelete({
  popupSelector: selectorPopupDelete,
  handleSubmitForm: (_id, buttonDeleteCard, cardCloneElement) => {
    api
      .getDeleteCardById(_id)
      .then((result) => {
        popupDelete.close();
        handleClickButtonDelete(buttonDeleteCard, cardCloneElement);
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
        avatarImg.src = inputValues.link;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((res) => {
        renderLoading(buttonSubmit, "Сохранить");
      });
    popupAddAvatar.close();
  },
});

popupAddAvatar.setEventListeners();

//ОТКРЫТИЕ попапа смены аватара
avatar.addEventListener("click", () => {
  popupAddAvatar.open();
  formElementAvatarValidator.resetValidation();
});

//функция удаления карточки при Саббмите удаления
const handleClickButtonDelete = (buttonDeleteCard, cardCloneElement) => {
  buttonDeleteCard.closest(".element");
  cardCloneElement.remove();
};

//Обработчик клика на УДАЛИТЬ
function handleButtonDeleteClick(_id, buttonDeleteCard, cardCloneElement) {
  popupDelete.open(_id, buttonDeleteCard, cardCloneElement);
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
  handleSubmitForm: (inputValues, buttonSubmit) => {
    renderLoading(buttonSubmit, "Сохранение...");
    api
      .loadingDataProfile(inputValues)
      .then((inputValues) => {
        userInfo.setUserInfo(inputValues.name, inputValues.about);
        //renderLoading(false, knopka, "Сохранение...", "Сохранить");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((res) => {
        renderLoading(buttonSubmit, "Сохранить");
      });
    popupEditProfile.close();
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
        renderCard([inputValues], inputValues.owner._id);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((res) => {
        renderLoading(buttonSubmit, "Создать");
      });
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
  const NewCard = new Section(
    {
      items: arrayAddNewCards,
      renderer: (item) => {
        const card = new Card({
          data: item,
          temlateSelector: ".element__template",
          handleCardClick: handleCardClick,
          handleButtonDeleteClick: handleButtonDeleteClick,
          handleClickLike: (_id, evt) => {
            api
              .getAddLike(_id)
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
        });
        // Создаём карточку и возвращаем наружу
        const cardElement = card.generateNewCard();
        NewCard.addItem(cardElement);
      },
    },
    cardListSelector
  );

  NewCard.renderCards();
}

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

//Запроса инф-ции о пользователе на сервер при загрузке страницы
api
  .getUserDataApi()
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about); // вызываем метод из класса setUserInfo, вставляем данные с сервера на страницу
    document.querySelector(".profile__image").src = data.avatar; //вставляем фото профиля с сервера
  })
  .catch((error) => {
    console.log(error);
  });

//Запрашиваем массив карточек и вставляем их в разметку
api
  .getDataCards()
  .then((result) => {
    const cards = result;
    renderCard(cards); // для вставки используем готовую функцию
  })
  .catch((error) => {
    console.log(error);
  });

//Функция для улучшения UX
function renderLoading(buttonSubmit, messageText) {
  buttonSubmit.textContent = messageText;
}
