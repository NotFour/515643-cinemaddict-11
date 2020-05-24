import AbstractComponent from "./abstract";

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

export default class FilmContainerExtra extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmContainerExtraTemplate(this._film);
  }
}
