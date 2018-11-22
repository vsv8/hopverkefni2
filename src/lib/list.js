import { empty } from './helpers';
import lectures from '../lectures.json';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  fetchData() {
    fetch('../lectures.json')
      .then((lectures) => {
          return lectures.json();
      }
      .then((data) => console.log(data.lectures[0]));
  }
  load() {
    empty(this.container);
  }
}
