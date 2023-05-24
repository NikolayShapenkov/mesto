// Новый класс для отрисовки карточки и вставки в разметку
export default class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items; //массив
    this._renderer = renderer; // функция для renderCards
    this._container = document.querySelector(selector); //Куда вставляем готовую разметку
  }

  //Отрисовка всех элементов
  renderCards() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  // Принимает DOM-элемент и добавляет его в контейнер
  addItem(newCard) {
    this._container.prepend(newCard);
  }
}
