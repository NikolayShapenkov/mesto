export default class Api {
  constructor(options) {
    this._requestUrl = options.baseUrl;
    this._headers = options.headers;
    this._passkey = options.password;
  }

  //Проверка статуса
  _chekStatusRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Метод для запроса инф-ции о пользователе на сервер
  getUserDataApi() {
    return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
      headers: {
        authorization: `${this._passkey}`,
      },
    }).then(this._chekStatusRes);
  }

  //Запрашиваем массив карточек и вставляем их в разметку
  getDataCards() {
    return fetch(`${this._requestUrl}cards`, {
      headers: {
        authorization: `${this._passkey}`,
      },
    }).then(this._chekStatusRes);
  }

  // Редактируем данные профиля на сервер
  loadingDataProfile(dataUser) {
    return fetch(`${this._requestUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._passkey}`,
        "Content-Type": `${this._headers}`,
      },
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.description,
      }),
    }).then(this._chekStatusRes);
  }

  //Загружаем карточку на cервер
  loadingDataCards(dataCards) {
    return fetch(`${this._requestUrl}cards`, {
      method: "POST",
      headers: {
        authorization: `${this._passkey}`,
        "Content-Type": `${this._headers}`,
      },
      body: JSON.stringify({
        name: dataCards.name,
        link: dataCards.link,
      }),
    }).then(this._chekStatusRes);
  }

  //Запрос на удаление карточки
  getDeleteCardById(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._passkey}`,
        "Content-Type": `${this._headers}`,
      },
    }).then(this._chekStatusRes);
  }

  //Запрос на лайк карточки
  getAddLike(_id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-66/cards/${_id}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: `${this._passkey}`,
          "Content-Type": `${this._headers}`,
        },
      }
    ).then(this._chekStatusRes);
  }

  //Запрос на снятие лайка карточки
  getDeleteLike(_id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-66/cards/${_id}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: `${this._passkey}`,
          "Content-Type": `${this._headers}`,
        },
      }
    ).then(this._chekStatusRes);
  }

  //Запрос на добавление аватара
  getAddAvatar(avatarURL) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: `${this._passkey}`,
          "Content-Type": `${this._headers}`,
        },
        body: JSON.stringify({
          avatar: avatarURL,
        }),
      }
    ).then(this._chekStatusRes);
  }
}
