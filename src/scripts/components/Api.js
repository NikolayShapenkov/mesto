export default class Api {
  constructor(options) {
    this._requestUrl = options.baseUrl; //"https://nomoreparties.co/v1/cohort-66/users/me"
    this._headers = options.headers;
    this._passkey = options.headers.authorization;
  }

  //Метод для запроса инф-ции о пользователе на сервер
  getUserDataApi() {
    return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
      headers: {
        authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
      },
    });
  }

  //Запрашиваем массив карточек и вставляем их в разметку
  getDataCards() {

    //return fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
        
        //console.log('ЗДЕСЬ СРАБОТАЛО?')
    return fetch(`${this._requestUrl}cards`, {
      headers: {
        authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
      },
    });
  }

  // Редактируем данные профиля на сервер
  loadingDataProfile(dataUser) {
    return fetch(`${this._requestUrl}users/me`, {
      //return fetch("https://mesto.nomoreparties.co/v1/cohort-66/users/me", {  
      method: "PATCH",
      headers: {
        authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.description,
      }),
    });
  }

  //Загружаем карточку на cервер
  loadingDataCards(dataCards) {
    return fetch(`${this._requestUrl}cards`, {
      method: "POST",
      headers: {
        authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dataCards.name,
        link: dataCards.link,
      }),
    })
  }

  //Запрос на удаление карточки
  getDeleteCardById(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
        "Content-Type": "application/json",
      }
    
    })
  }

  //Запрос на лайк карточки
  getAddLike(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${_id}/likes`, {
      method: "PUT",
      headers: {
        authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
        "Content-Type": "application/json",
      }
    })
  }

  //Запрос на снятие лайка карточки
  getDeleteLike(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${_id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
        "Content-Type": "application/json",
      }
    })
  }
  
  //Запрос на добавление аватара
  getAddAvatar(avatarURL) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarURL,
      })
    })
  }

}






//Функция для запроса инф-ции о пользователе на сервер
/*export const UserRequest = () => {
  return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
    headers: {
      authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
    },
  });
};

//Функция для запроса карточек к сервера
export const requestDataCards = () => {
  return fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
    headers: {
      authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
    },
  });
};

//Функция для отправки данных профиля на сервер
export const loadingDataProfile = (dataUser) => {
  return fetch("https://mesto.nomoreparties.co/v1/cohort-66/users/me", {
    method: "PATCH",
    headers: {
      authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: dataUser.name,
      about: dataUser.description,
    }),
  });
};

//Функция для отправки данных карточки на сервер
export const loadingDataCards = (dataCards) => {
  return fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
    method: "POST",
    headers: {
      authorization: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: dataCards.name,
      link: dataCards.link,
    }),
  });
};

/*const option = {
    baseUrl: "https://nomoreparties.co/v1/cohort-66/users/",
    headers: "",
    password: "b462be91-a64a-47db-8f1b-d1a2e0f5554a",
}*/

