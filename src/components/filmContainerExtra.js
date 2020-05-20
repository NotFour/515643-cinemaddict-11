import {createElement} from "../utils";

const createFilmContainerExtraTemplate = (film) => {
  const {filmInfo} = film;

  return `
    <section class="films-list--extra">
      <h2 class="films-list__title">${filmInfo.title}</h2>

      <div class="films-list__container">
      </div>
    </section>
  `;
};

export default class FilmContainerExtra {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createFilmContainerExtraTemplate(this._film);
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
