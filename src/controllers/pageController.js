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
    this._sort = new SortMenu();
    this._container = container;
  }

  render(filmsData, filtersData) {
    const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

    const header = document.querySelector(`.header`);
    const userLevelComponent = new UserLevel();
    render(header, userLevelComponent, RenderPosition.BEFOREEND);

    const mainMenuComponent = new MainMenu(filtersData);
    const filmContainerComponent = new FilmContainer(filmsData);

    render(this._container, mainMenuComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sort, RenderPosition.BEFOREEND);
    render(this._container, filmContainerComponent, RenderPosition.BEFOREEND);

    const filmsListContainer = document.querySelector(`.films .films-list .films-list__container`);
    let filmsShowed = 0;
    let filmObjects = [];
    let sortedFilmsObject = {
      "default": [],
      "date": [],
      "rating": [],
    };

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
        const currentFilmObject = findFilmObject(filmObjects, `card`, evt.target.parentElement);
        const currentPopup = currentFilmObject.popup;

        render(document.body, currentPopup, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, onPopupCloseKey);
        currentPopup.setClickHandler(closePopup);

        const commentsList = currentPopup.getElement().querySelector(`.film-details__comments-list`);
        currentFilmObject.comments.forEach((comment) => {
          render(commentsList, comment, RenderPosition.BEFOREEND);
        });
      }
    };

    const closePopup = () => {
      const currentPopup = findFilmObject(filmObjects, `popup`, document.querySelector(`.film-details`)).popup;
      remove(currentPopup);
      document.removeEventListener(`keydown`, onPopupCloseKey);
    };

    const sortFilmObject = () => {
      sortedFilmsObject.date = filmObjects.slice().sort((a, b) => {
        return b.card._film.filmInfo.release.year - a.card._film.filmInfo.release.year;
      });

      sortedFilmsObject.rating = filmObjects.slice().sort((a, b) => {
        return b.card._film.filmInfo.totalRating - a.card._film.filmInfo.totalRating;
      });
    };

    const removeChildElement = (parent) => {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };

    const changeSort = (sortType) => {
      this._sort.switchActiveElem(sortType);

      removeChildElement(filmsListContainer);

      filmObjects = sortedFilmsObject[sortType];
      for (let i = 0; i < filmsShowed; i++) {
        render(filmsListContainer, filmObjects[i].card, RenderPosition.BEFOREEND);
      }
    };

    this._sort.setClickHandler(changeSort);

    const createFilm = (film) => {
      const comments = [];

      film.comments.forEach((item) => {
        comments.push(new Comment(item));
      });

      filmObjects.push(
          {
            card: new FilmCard(film),
            popup: new FilmPopup(film),
            comments
          }
      );

      const currentCard = filmObjects[filmObjects.length - 1].card;

      currentCard.setClickHandler(showPopup);
    };

    for (let i = 0; i < filmsData.length; i++) {
      createFilm(filmsData[i]);
    }

    sortedFilmsObject.default = filmObjects;

    for (filmsShowed; filmsShowed < 5 && filmsShowed < filmsData.length; filmsShowed++) {
      render(filmsListContainer, filmObjects[filmsShowed].card, RenderPosition.BEFOREEND);
    }

    const filmsList = document.querySelector(`.films .films-list`);

    if (filmsData.length) {
      const showMoreComponent = new ShowMore();
      render(filmsList, showMoreComponent, RenderPosition.BEFOREEND);

      showMoreComponent.setClickHandler(() => {
        const prevFilmsShowed = filmsShowed;

        filmsShowed = filmsShowed + SHOWING_FILMS_COUNT_BY_BUTTON;

        filmObjects.slice(prevFilmsShowed, filmsShowed).forEach((film) => {
          render(filmsListContainer, film.card, RenderPosition.BEFOREEND);
        });

        if (filmsShowed >= filmObjects.length) {
          remove(showMoreComponent);
        }
      });
    }

    const footerStatistic = document.querySelector(`.footer__statistics`);
    const filmsStatisticComponent = new FilmsStatistic(filmObjects.length);
    render(footerStatistic, filmsStatisticComponent, RenderPosition.BEFOREEND);

    sortFilmObject();
  }
}
