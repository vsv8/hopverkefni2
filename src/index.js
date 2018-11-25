import List from './lib/list';
import { load as loadFrontapage } from './lib/frontpage';
import { load as loadLecture } from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    loadLecture(page);

  } else {
    /* const list = new List(); */
    /* list.load(); */
    loadFrontapage(page);
  }
});
