// Новый класс для отрисовки карточки и вставки в разметку
export default class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items; //объект
    this._renderer = renderer; // функция для renderCards
    this._container = document.querySelector(selector); //Куда вставляем готовую разметку
  }

  //Отрисовка всех элементов
  renderCards() {
    this._initialArray.forEach((item) => {
      const amount = item.likes.length; //длина массива, переданного с сервера
      //console.log(item.owner._id);
      this._renderer(item, amount);
    });
  }

  // Принимает DOM-элемент и добавляет его в контейнер
  addItem(newCard) {
    this._container.prepend(newCard);
  }
}
