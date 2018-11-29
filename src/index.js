import List from './lib/list';
import loader from './lib/frontpage';
import load from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const list = new List();
    load(page,list);

  } else {
    const list = new List();
    loader(page,list);
  }
});
