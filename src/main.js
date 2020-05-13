import {getUserLevel} from './components/userLevel.js';
import {getMainMenu} from './components/mainMenu.js';
import {getSortMenu} from './components/sortMenu.js';
import {getFilmContainer} from './components/filmContainer.js';
import {getFilmCard} from './components/filmCard.js';
import {getShowMore} from './components/showMore.js';
import {getFilmsStatistic} from './components/filmStat.js';
import {getFilmPopup} from './components/filmPopup.js';

const renderComponent = function (template, element) {
  template.innerHTML += element;
};

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomElems = function (mass, count = 1) {
  const iterator = (typeof count === `number`) ? count : getRandomNumber(...count);

  const result = [];
  let randomElem;
  for (let i = 0; i < iterator; i++) {
    randomElem = mass[getRandomNumber(0, mass.length - 1)];
    result.push(randomElem);
  }

  return result;
};

const createFilmObject = function () {
  const posters = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
  const labels = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(/\.{1} /).map((sentense) => {
    return `${sentense}. `;
  });
  const emotions = [`smile`, `sleeping`, `puke`, `angry`];
  const filmDuration = getRandomNumber(60, 180);

  const comments = [
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      comment: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2019/12/31 23:59`,
      emotion: getRandomElems(emotions)
    },
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      comment: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2019/12/31 23:59`,
      emotion: getRandomElems(emotions)
    },
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      comment: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2019/12/31 23:59`,
      emotion: getRandomElems(emotions)
    },
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      comment: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2019/12/31 23:59`,
      emotion: getRandomElems(emotions)
    },
    {
      id: `42`,
      author: `Ilya O'Reilly`,
      comment: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2019/12/31 23:59`,
      emotion: getRandomElems(emotions)
    },
  ];

  return {
    id: `0`,
    comments: getRandomElems(comments, [0, 5]),
    filmInfo: {
      title: `A Little Pony Without The Carpet`,
      alternativeTitle: `Original: ${`Laziness Who Sold Themselves`}`,
      totalRating: 5.3,
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
        date: `30 March 1945`,
        year: `2019`,
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

const createMocks = function (count) {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(createFilmObject());
  }

  return result;
};

const mocks = createMocks(20);

const createFiltersObject = function () {
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
renderComponent(header, getUserLevel());

const mainContainer = document.querySelector(`.main`);

renderComponent(mainContainer, getMainMenu(filters));
renderComponent(mainContainer, getSortMenu());
renderComponent(mainContainer, getFilmContainer());

const filmsList = document.querySelector(`.films .films-list`);
let filmsListContainer = document.querySelector(`.films .films-list .films-list__container`);

let filmsShowed = 0;

for (filmsShowed; filmsShowed < 5; filmsShowed++) {
  renderComponent(filmsListContainer, getFilmCard(mocks[filmsShowed]));
}

renderComponent(filmsList, getShowMore());

const footerStatistic = document.querySelector(`.footer__statistics`);

renderComponent(footerStatistic, getFilmsStatistic(`130 291`));
renderComponent(document.body, getFilmPopup(mocks[0]));


let filmsShowedLater = filmsShowed;

filmsListContainer = document.querySelector(`.films .films-list .films-list__container`);
const showMoreBtn = document.querySelector(`.films-list__show-more`);

const showMore = function () {

  for (filmsShowed; filmsShowed < filmsShowedLater + 5 && filmsShowed < mocks.length; filmsShowed++) {
    renderComponent(filmsListContainer, getFilmCard(mocks[filmsShowed]));
  }

  filmsShowedLater = filmsShowed;

  if (filmsShowed === mocks.length) {
    showMoreBtn.removeEventListener(`click`, showMore);
    showMoreBtn.classList.add(`visually-hidden`);
  }
};

showMoreBtn.addEventListener(`click`, showMore);
