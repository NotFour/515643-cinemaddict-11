import {getRandomNumber} from '../utils/common.js';
import AbstractComponent from "./abstract";
import {getTTimeFromMinutes} from "../utils/common";

const createFilmCardTemplate = (film) => {
  const {filmInfo, comments, userDetails} = film;

  const watchListButtonInactiveClass = userDetails.watchlist ? `film-card__controls-item--active` : ``;
  const watchedButtonInactiveClass = userDetails.alreadyWatched ? `film-card__controls-item--active` : ``;
  const favoriteButtonInactiveClass = userDetails.favorite ? `film-card__controls-item--active` : ``;

  const duration = getTTimeFromMinutes(filmInfo.runtime);
  const filmGenre = filmInfo.genre[getRandomNumber(0, 2)];

  return `
    <article class="film-card">
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmInfo.release.year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${filmGenre}</span>
      </p>
      <img src="${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmInfo.description}</p>
      <a class="film-card__comments">${comments.length}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListButtonInactiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButtonInactiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonInactiveClass}">Mark as favorite</button>
      </form>
    </article>
  `;
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
