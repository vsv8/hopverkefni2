import List from './lib/list';
import { load as loadFrontapage } from './lib/frontpage';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {

  } else {
    /* const list = new List(); */
    /* list.load(); */
    loadFrontapage(page);
  }
});
