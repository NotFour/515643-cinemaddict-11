import AbstractComponent from "./abstract";

const createFilmsStatisticTemplate = (count) => {

  return `
    <p>${count} movies inside</p>
  `;
};

export default class FilmsStatistic extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFilmsStatisticTemplate(this._count);
  }
}
