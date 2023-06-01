export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileTitle = document.querySelector(profileNameSelector);
    this._profileText = document.querySelector(profileDescriptionSelector);
  }

  //Создаем массив из данных со страницы в классе UserInfo
  getUserInfo() {
    const dataUserProfile = {};
    dataUserProfile.firstName = this._profileTitle.textContent;
    dataUserProfile.description = this._profileText.textContent;
    return dataUserProfile;
  }

  //Принимает новые данные пользователя (объект) и добавляет их на страницу при сабмите
  setUserInfo(firtname, description) {
    this._profileTitle.textContent = firtname; //заполняем имя на странице данными из поля имени
    this._profileText.textContent = description; //заполняем Описание на странице данными из поля описания
  }
}
