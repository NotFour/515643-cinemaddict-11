export const KeyCode = {
  ESC: 27
};

export const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomElems = (mass, count = 1) => {
  const iterator = (typeof count === `number`) ? count : getRandomNumber(...count);

  const result = [];
  let randomElem;
  for (let i = 0; i < iterator; i++) {
    randomElem = mass[getRandomNumber(0, mass.length - 1)];
    result.push(randomElem);
  }

  return result;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const getTTimeFromMinutes = (minutes) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const isEscEvent = (evt, action) => {
  if (evt.keyCode === KeyCode.ESC) {
    action();
  }
};
