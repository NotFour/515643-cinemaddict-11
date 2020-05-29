import AbstractComponent from "./abstract";

const createSortMenuTemplate = () => {
  return `
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort="default">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort="date">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort="rating">Sort by rating</a></li>
    </ul>
  `;
};


export default class SortMenu extends AbstractComponent {
  getTemplate() {
    return createSortMenuTemplate();
  }

  switchActiveElem(sortType) {
    let oldActiveButton = this.getElement().querySelector(`.sort__button--active`);
    oldActiveButton.classList.remove(`sort__button--active`);

    this.getElement().querySelector(`a[data-sort=${sortType}]`).classList.add(`sort__button--active`);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`sort__button`) && !evt.target.classList.contains(`sort__button--active`)) {
        handler(evt.target.getAttribute(`data-sort`));
      }
    });
  }
}
