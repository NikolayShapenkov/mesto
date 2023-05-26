import { fieldNameInput, fieldDescriptionInput } from "../utils/constants.js";

export default class UserInfo {
    constructor( {profileNameSelector, profileDescriptionSelector} ) {
       this._profileTitle = document.querySelector(profileNameSelector);
       this._profileText = document.querySelector(profileDescriptionSelector);
   }

   //Создаем массив из данных со страницы в классе UserInfo
    getUserInfo() {
        const dataUserProfile = {};
        dataUserProfile.firstName = this._profileTitle.textContent;
        dataUserProfile.description = this._profileText.textContent;
        this._dataUserProfile = dataUserProfile;
        console.log(this._dataUserProfile);
        return dataUserProfile;
    }
    
    test() {
        console.log();
    }

    setUserInfoForInput() {
        fieldNameInput.value = this._dataUserProfile.firstName; //заполняем поле имени данными со страницы
        fieldDescriptionInput.value = this._dataUserProfile.description;
    }

    //Принимает новые данные пользователя (объект) и добавляет их на страницу при сабмите
    setUserInfo(firtname, description) {
        console.log('РАБОТАЕТ?');
        this._profileTitle.textContent = firtname; //заполняем имя на странице данными из поля имени
        this._profileText.textContent = description; //заполняем Описание на странице данными из поля описания
    }

}

