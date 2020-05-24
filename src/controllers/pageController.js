import UserLevel from "../components/userLevel";
import {remove, render, RenderPosition} from "../utils/render";
import MainMenu from "../components/mainMenu";
import SortMenu from "../components/sortMenu";
import FilmContainer from "../components/filmContainer";
import {isEscEvent} from "../utils/common";
import Comment from "../components/comment";
import FilmCard from "../components/filmCard";
import FilmPopup from "../components/filmPopup";
import ShowMore from "../components/showMore";
import FilmsStatistic from "../components/filmStat";

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(filmsData, filtersData) {
    const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

    const header = document.querySelector(`.header`);
    const userLevelComponent = new UserLevel();
    render(header, userLevelComponent, RenderPosition.BEFOREEND);

    const mainMenuComponent = new MainMenu(filtersData);
    const sortMenuComponent = new SortMenu();
    const filmContainerComponent = new FilmContainer(filmsData);

    render(this._container, mainMenuComponent, RenderPosition.BEFOREEND);
    render(this._container, sortMenuComponent, RenderPosition.BEFOREEND);
    render(this._container, filmContainerComponent, RenderPosition.BEFOREEND);

    const filmsListContainer = document.querySelector(`.films .films-list .films-list__container`);
    let filmsShowed = 0;
    const renderedFilms = [];

    const findFilmObject = (films, filter, element) => {
      return films.find((film) => {
        return film[filter].getElement() === element;
      });
    };

    const onPopupCloseKey = (evt) => {
      isEscEvent(evt, closePopup);
    };

    const showPopup = (evt) => {
      if ([`film-card__title`, `film-card__poster`, `film-card__comments`].indexOf(evt.target.classList[0]) !== -1) {
        const currentFilmObject = findFilmObject(renderedFilms, `card`, evt.target.parentElement);
        const currentPopup = currentFilmObject.popup;

        render(document.body, currentPopup, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, onPopupCloseKey);

        const commentsList = currentPopup.getElement().querySelector(`.film-details__comments-list`);
        currentFilmObject.comments.forEach((comment) => {
          render(commentsList, comment, RenderPosition.BEFOREEND);
        });
      }
    };

    const closePopup = () => {
      const currentPopup = findFilmObject(renderedFilms, `popup`, document.querySelector(`.film-details`)).popup;
      remove(currentPopup);
      document.removeEventListener(`keydown`, onPopupCloseKey);
    };

    const createFilm = (film) => {
      const comments = [];

      film.comments.forEach((item) => {
        comments.push(new Comment(item));
      });

      renderedFilms.push(
          {
            card: new FilmCard(film),
            popup: new FilmPopup(film),
            comments
          }
      );

      const currentCard = renderedFilms[renderedFilms.length - 1].card;
      const currentPopup = renderedFilms[renderedFilms.length - 1].popup;

      currentCard.setClickHandler(showPopup);
      currentPopup.setClickHandler(closePopup);
      render(filmsListContainer, currentCard, RenderPosition.BEFOREEND);
    };

    for (filmsShowed; filmsShowed < 5 && filmsShowed < filmsData.length; filmsShowed++) {
      createFilm(filmsData[filmsShowed]);
    }

    const filmsList = document.querySelector(`.films .films-list`);

    if (filmsData.length) {
      const showMoreComponent = new ShowMore();
      render(filmsList, showMoreComponent, RenderPosition.BEFOREEND);

      showMoreComponent.setClickHandler(() => {
        const prevFilmsShowed = filmsShowed;

        filmsShowed = filmsShowed + SHOWING_FILMS_COUNT_BY_BUTTON;

        filmsData.slice(prevFilmsShowed, filmsShowed).forEach((film) => createFilm(film));

        if (filmsShowed >= filmsData.length) {
          remove(showMoreComponent);
        }
      });
    }

    const footerStatistic = document.querySelector(`.footer__statistics`);
    const filmsStatisticComponent = new FilmsStatistic(filmsData.length);
    render(footerStatistic, filmsStatisticComponent, RenderPosition.BEFOREEND);
  }
}
