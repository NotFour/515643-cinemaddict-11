const getFilmCard = function (film) {
  return `
    <article class="film-card">
      <h3 class="film-card__title">${film.filmInfo.title}</h3>
      <p class="film-card__rating">${film.filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${film.filmInfo.release.year}</span>
        <span class="film-card__duration">${film.filmInfo.runtime}</span>
        <span class="film-card__genre">${film.filmInfo.genre[1]}</span>
      </p>
      <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${film.filmInfo.description}</p>
      <a class="film-card__comments">${film.comments.length}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.userDetails.watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.userDetails.alreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${film.userDetails.favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>
  `;
};

export {getFilmCard};
