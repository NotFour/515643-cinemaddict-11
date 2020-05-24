import {getRandomElems, getRandomNumber} from "./utils/common";
import PageController from "./controllers/pageController";

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
      id: getRandomNumber(1, 42),
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}T16:12:32.554Z`,
      emotion: getRandomElems(emotions)
    },
    {
      id: getRandomNumber(1, 42),
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}T16:12:32.554Z`,
      emotion: getRandomElems(emotions)
    },
    {
      id: getRandomNumber(1, 42),
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}T16:12:32.554Z`,
      emotion: getRandomElems(emotions)
    },
    {
      id: getRandomNumber(1, 42),
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}T16:12:32.554Z`,
      emotion: getRandomElems(emotions)
    },
    {
      id: getRandomNumber(1, 42),
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}T16:12:32.554Z`,
      emotion: getRandomElems(emotions)
    },
    {
      id: getRandomNumber(1, 42),
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}T16:12:32.554Z`,
      emotion: getRandomElems(emotions)
    },
    {
      id: getRandomNumber(1, 42),
      author: `Ilya O'Reilly`,
      text: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: `2020-${getRandomNumber(1, 12)}-${getRandomNumber(1, 28)}T16:12:32.554Z`,
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
      runtime: filmDuration,
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

const createFiltersObject = (films) => {
  let watchlist = 0; let history = 0; let favorites = 0;

  for (const film of films) {
    watchlist += film.userDetails.watchlist ? film.userDetails.watchlist : 0;
    history += film.userDetails.alreadyWatched ? film.userDetails.alreadyWatched : 0;
    favorites += film.userDetails.favorite ? film.userDetails.favorite : 0;
  }

  return {
    watchlist,
    history,
    favorites,
  };
};

const createMocks = (count) => {
  const result = {
    films: [],
    filter: {}
  };

  for (let i = 0; i < count; i++) {
    result.films.push(createFilmObject());
  }

  result.filter = createFiltersObject(result.films);

  return result;
};

let mocks = createMocks(20);

const mainContainer = document.querySelector(`.main`);

const page = new PageController(mainContainer);
page.render(mocks.films, mocks.filter);


