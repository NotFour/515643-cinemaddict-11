import AbstractComponent from "./abstract";

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


export default class FilmContainer extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmContainerTemplate(this._films);
  }
}
