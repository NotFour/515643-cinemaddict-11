import {createElement} from "../utils";

const createFilmContainerTemplate = (films) => {
  const isSomeFilms = !!films.length;
  const filmListTitleVisible = isSomeFilms ? `visually-hidden` : ``;
  const filmsTitle = isSomeFilms ? `All movies. Upcoming` : `There are no movies in our database`;
  const filmsContainer = isSomeFilms ? `<div class="films-list__container"></div>` : ``;

  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title ${filmListTitleVisible}">${filmsTitle}</h2>
        ${filmsContainer}
      </section>
    </section>
  `;
};


export default class FilmContainer {
  constructor(films) {
    this._films = films;

    this._element = null;
  }

  getTemplate() {
    return createFilmContainerTemplate(this._films);
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
