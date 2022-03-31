export class Section {
  constructor({items, renderer}, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach(item => {
      this._renderer(this._container, item)
    });
  }

  addItem = (item) => {
    this._container.prepend(item);
  }
}
