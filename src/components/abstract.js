import {createElement} from "../utils/render";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can not instantiate Abstract class`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate().name}`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
