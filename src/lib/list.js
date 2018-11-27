import { empty } from './helpers';
import { load } from './storage';

export default class List {
  constructor() {
    this.list = load();
  }

}
