import {getUserLevel} from './components/userLevel.js';
import {getMainMenu} from './components/mainMenu.js';
import {getSortMenu} from './components/sortMenu.js';
import {getFilmContainer} from './components/filmContainer.js';
import {getFilmCard} from './components/filmCard.js';
import {getShowMore} from './components/showMore.js';
import {getFilmContainerExtra} from './components/filmContainerExtra.js';
import {getFilmsStatistic} from './components/filmStat.js';
import {getFilmPopup} from './components/filmPopup.js';

const renderComponent = function (template, element) {
  template.innerHTML += element;
};

const header = document.querySelector(`.header`);
renderComponent(header, getUserLevel());

const mainContainer = document.querySelector(`.main`);

renderComponent(mainContainer, getMainMenu());
renderComponent(mainContainer, getSortMenu());
renderComponent(mainContainer, getFilmContainer());

const filmsSection = document.querySelector(`.films`);
const filmsList = document.querySelector(`.films .films-list`);
const filmsListContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < 5; i++) {
  renderComponent(filmsListContainer, getFilmCard());
}

renderComponent(filmsList, getShowMore());
renderComponent(filmsSection, getFilmContainerExtra(`Top rated`));
renderComponent(filmsSection, getFilmContainerExtra(`Most commented`));

const filmsExtraListContainers = document.querySelectorAll(`.films-list--extra .films-list__container`);

filmsExtraListContainers.forEach(function (filmContainer) {
  for (let i = 0; i < 2; i++) {
    renderComponent(filmContainer, getFilmCard());
  }
});

const footerStatistic = document.querySelector(`.footer__statistics`);

renderComponent(footerStatistic, getFilmsStatistic());
renderComponent(document.body, getFilmPopup());

