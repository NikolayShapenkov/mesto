// Новый класс для отрисовки карточки и вставки в разметку
export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer; // функция для renderCards
    this._container = document.querySelector(selector); //Куда вставляем готовую разметку
  }

  //Отрисовка всех элементов
  renderCards(items, myID) {
    items.reverse().forEach((item) => {
      const _id = item._id;
      this._renderer(item, _id, myID);
    });
  }

  // Принимает DOM-элемент и добавляет его в контейнер
  addItem(newCard) {
    this._container.prepend(newCard);
  }
}
