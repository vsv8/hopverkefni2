import List from './lib/list';
import { load as loadFrontapage } from './lib/frontpage';
import { load as loadLecture } from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const list = new List();
    loadLecture(page,list);

  } else {
    const list = new List();
    loadFrontapage(page,list);
  }
});
