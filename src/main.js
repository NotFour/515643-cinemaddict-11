import {getRandomNumber, render, RenderPosition} from "./utils";
import UserLevel from "./components/userLevel";
import MainMenu from "./components/mainMenu";
import FilmContainer from "./components/filmContainer";
import SortMenu from "./components/sortMenu";
import FilmCard from "./components/filmCard";
import ShowMore from "./components/showMore";
import FilmsStatistic from "./components/filmStat";
import FilmPopup from "./components/filmPopup";


const getRandomElems = (mass, count = 1) => {
  const iterator = (typeof count === `number`) ? count : getRandomNumber(...count);

  const result = [];
  let randomElem;
  for (let i = 0; i < iterator; i++) {
    randomElem = mass[getRandomNumber(0, mass.length - 1)];
    result.push(randomElem);
  }

  return result;
};

const createFilmObject = () => {
  const posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
  const filmTitles = [`Один дома`, `Друзья`, `Как я встретил вашу маму`, `Теория большого взрыва`, `Мальчишник в Вегасе`, `Виноваты звезды`, `Если я останусь`, `Звездные войны`, `Стыд`, `Чудотворцы`, `Несгибаемая Кимми Шмидт`, `Кот в сапогах`];
  const labels = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(/\.{1} /).map((sentense) => {
    return `${sentense}. `;
  });
  const emotions = [`smile`, `sleeping`, `puke`, `angry`];
  const filmDuration = getRandomNumber(60, 180);

  const filmTitle = getRandomElems(filmTitles);
  const months = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`];
  const filmYear = getRandomNumber(1997, 2018);

  const comments = [
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020/${getRandomNumber(1, 12)}/${getRandomNumber(1, 28)} ${getRandomNumber(0, 23)}:${getRandomNumber(0, 59)}`,
      emotion: getRandomElems(emotions)
    },
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020/${getRandomNumber(1, 12)}/${getRandomNumber(1, 28)} ${getRandomNumber(0, 23)}:${getRandomNumber(0, 59)}`,
      emotion: getRandomElems(emotions)
    },
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020/${getRandomNumber(1, 12)}/${getRandomNumber(1, 28)} ${getRandomNumber(0, 23)}:${getRandomNumber(0, 59)}`,
      emotion: getRandomElems(emotions)
    },
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020/${getRandomNumber(1, 12)}/${getRandomNumber(1, 28)} ${getRandomNumber(0, 23)}:${getRandomNumber(0, 59)}`,
      emotion: getRandomElems(emotions)
    },
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020/${getRandomNumber(1, 12)}/${getRandomNumber(1, 28)} ${getRandomNumber(0, 23)}:${getRandomNumber(0, 59)}`,
      emotion: getRandomElems(emotions)
    },
  ];

  return {
    id: `0`,
    comments: getRandomElems(comments, [0, 5]),
    filmInfo: {
      title: filmTitle,
      alternativeTitle: `Original: ${filmTitle}`,
      totalRating: `${getRandomNumber(0, 9)}.${getRandomNumber(1, 9)}`,
      poster: `./images/posters/${getRandomElems(posters)}`,
      ageRating: `${0}+`,
      director: `Tom Ford`,
      writers: [
        `Takeshi Kitano`,
        `Takeshi Kitano`,
        `Takeshi Kitano`
      ].join(`, `),
      actors: [
        `Morgan Freeman`,
        `Morgan Freeman`
      ].join(`, `),
      release: {
        date: `${getRandomNumber(1, 28)} ${getRandomElems(months)} ${filmYear}`,
        year: filmYear,
        releaseCountry: `Finland`
      },
      runtime: `${Math.floor(filmDuration / 60)}h ${filmDuration % 60}m`,
      genre: [
        `Comedy`,
        `thriller`,
        `melodramma`
      ],
      description: getRandomElems(labels, [1, 5]).join(``),
    },
    userDetails: {
      watchlist: getRandomNumber(0, 1),
      alreadyWatched: getRandomNumber(0, 1),
      watchingDate: `2019-04-12T16:12:32.554Z`,
      favorite: getRandomNumber(0, 1)
    }
  };
};

const createMocks = (count) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(createFilmObject());
  }

  return result;
};

const mocks = createMocks(20);

const createFiltersObject = () => {
  let watchlist = 0; let history = 0; let favorites = 0;

  for (const mock of mocks) {
    watchlist += mock.userDetails.watchlist ? mock.userDetails.watchlist : 0;
    history += mock.userDetails.alreadyWatched ? mock.userDetails.alreadyWatched : 0;
    favorites += mock.userDetails.favorite ? mock.userDetails.favorite : 0;
  }

  return {
    watchlist,
    history,
    favorites,
  };
};

const filters = createFiltersObject();

const header = document.querySelector(`.header`);
const userLevelComponent = new UserLevel();
render(header, userLevelComponent.getElement(), RenderPosition.BEFOREEND);

const mainContainer = document.querySelector(`.main`);
const mainMenuComponent = new MainMenu(filters);
const sortMenuComponent = new SortMenu();
const filmContainerComponent = new FilmContainer();

render(mainContainer, mainMenuComponent.getElement(), RenderPosition.BEFOREEND);
render(mainContainer, sortMenuComponent.getElement(), RenderPosition.BEFOREEND);
render(mainContainer, filmContainerComponent.getElement(), RenderPosition.BEFOREEND);

let filmsListContainer = document.querySelector(`.films .films-list .films-list__container`);
let filmsShowed = 0;
let renderedFilms = [];

const findFilmObject = (films, filter, element) => {
  return films.find((film) => {
    return film[filter].getElement() === element;
  });
};

const showPopup = (evt) => {
  if ([`film-card__title`, `film-card__poster`, `film-card__comments`].indexOf(evt.target.classList[0]) !== -1) {
    const currentPopup = findFilmObject(renderedFilms, `card`, evt.target.parentElement).popup.getElement();
    document.body.appendChild(currentPopup);
  }
};

const closePopup = () => {
  const currentPopup = findFilmObject(renderedFilms, `popup`, document.querySelector(`.film-details`)).popup.getElement();
  document.body.removeChild(currentPopup);
};

const onCardClick = (evt) => {
  showPopup(evt);
};

const createFilm = (index) => {
  renderedFilms.push(
      {
        card: new FilmCard(mocks[index]),
        popup: new FilmPopup(mocks[index])
      }
  );

  const currentCard = renderedFilms[index].card;
  const currentPopup = renderedFilms[index].popup;

  currentCard.getElement().addEventListener(`click`, onCardClick);
  currentPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, closePopup);

  render(filmsListContainer, currentCard.getElement(), RenderPosition.BEFOREEND);
};

for (filmsShowed; filmsShowed < 5; filmsShowed++) {
  createFilm(filmsShowed);
}

const filmsList = document.querySelector(`.films .films-list`);
const showMoreComponent = new ShowMore();
render(filmsList, showMoreComponent.getElement(), RenderPosition.BEFOREEND);

const footerStatistic = document.querySelector(`.footer__statistics`);
const filmsStatisticComponent = new FilmsStatistic(`130 291`);
render(footerStatistic, filmsStatisticComponent.getElement(), RenderPosition.BEFOREEND);

// render(document.body, FilmPopupComponent.getElement(), RenderPosition.BEFOREEND);

let filmsShowedLater = filmsShowed;

filmsListContainer = document.querySelector(`.films .films-list .films-list__container`);
const showMoreBtn = document.querySelector(`.films-list__show-more`);

const showMore = () => {
  for (filmsShowed; filmsShowed < filmsShowedLater + 5 && filmsShowed < mocks.length; filmsShowed++) {
    createFilm(filmsShowed);
  }

  filmsShowedLater = filmsShowed;

  if (filmsShowed === mocks.length) {
    showMoreBtn.removeEventListener(`click`, showMore);
    showMoreBtn.classList.add(`visually-hidden`);
  }
};

showMoreBtn.addEventListener(`click`, showMore);
