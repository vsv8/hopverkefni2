import { el } from './helpers';
import { remove, add } from './storage';

const LECTURE_URL = '../lectures.json';
let lecturepage;
let slug;


function findlecture(array, key, value) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}

function createYoutube(data) {
  const element = el('iframe', 'lecture__youtube__video', '');
  element.src = data;
  element.frameborder = '0';
  element.allowfullscreen = '0';
  const container = el('div', 'lecture__youtube__container', element);
  return container;
}
function createText(data) {
  const container = el('div', 'lecture__text__container', '');
  const textar = data.split('\n');
  textar.forEach((text) => {
    const element = el('p', 'lecture__text', `${text}`);
    container.appendChild(element);
  });
  return container;
}
function createQuote(data, attribute) {
  const container = el('div', 'lecture__quote__container', '');
  const element = el('p', 'lecture__quote', `${data}`);
  container.appendChild(element);
  const element2 = el('p', 'lecture__quote__attribute', `${attribute}`);
  container.appendChild(element2);
  return container;
}
function createImage(data, caption) {
  const container = el('div', 'lecture__quote__container', '');
  const element = el('img', 'lecture__image', '');
  element.src = data;
  container.appendChild(element);
  const element2 = el('p', 'lecture__image__caption', `${caption}`);
  container.appendChild(element2);
  return container;
}
function createHeading(data) {
  const element = el('h2', 'lecture__heading', `${data}`);
  return element;
}
function createList(data) {
  const list = el('ul', 'lecture__list', '');
  data.forEach((listEl) => {
    const element = el('li', 'lecture__list__element', `${listEl}`);
    list.appendChild(element);
  });
  return list;
}
function createCode(data) {
  const container = el('div', 'lecture__code__container', '');
  const lines = data.split('\n');
  lines.forEach((line) => {
    let element;
    if (line === '') {
      element = el('br', '', '');
    } else {
      element = el('p', 'lecture__code', `${line}`);
    }
    container.appendChild(element);
  });
  return container;
}


function displayLectureHeader(image, title, category) {
  const header = lecturepage.querySelector('.header__lecture');
  if (image) {
    header.style.backgroundImage = `url(${image})`;
  } else {
    header.style.backgroundImage = 'none';
  }
  const headerSubtitle = el('h3', 'header__subtitle', category);
  const headerTitle = el('h1', 'header__title', title);
  header.appendChild(headerSubtitle);
  header.appendChild(headerTitle);
}

function displayLectureContent(content) {
  const container = lecturepage.querySelector('.lecture__container');
  content.forEach((entry) => {
    const {
      data, type, caption, attribute,
    } = entry;
    let element;
    if (type === 'youtube') {
      element = createYoutube(data);
    } else if (type === 'text') {
      element = createText(data);
    } else if (type === 'quote') {
      element = createQuote(data, attribute);
    } else if (type === 'image') {
      element = createImage(data, caption);
    } else if (type === 'heading') {
      element = createHeading(data);
    } else if (type === 'list') {
      element = createList(data);
    } else if (type === 'code') {
      element = createCode(data);
    }
    const colElement = el('div', ['col', 'col12', 'colBig8', 'offsetBig2'], element);
    container.appendChild(colElement);
  });
}


function displayLecture(lecture) {
  const {
    category, content, image, title,
  } = lecture;
  displayLectureHeader(image, title, category);
  displayLectureContent(content);
}


function fetchLecture() {
  fetch(`${LECTURE_URL}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Óþekkt villa');
    })
    .then((data) => {
      const lectures = Array.from(data.lectures);
      const lecture = findlecture(lectures, 'slug', slug);
      displayLecture(lecture);
    })
    .catch((error) => {
      console.error(error);
    });
}


function finish(e) {
  e.target.classList.toggle('lecture__footer__finished__selected');
  if (e.target.classList.contains('lecture__footer__finished__selected')) {
    add(slug);
  } else {
    remove(slug);
  }
}

export default function load(_lecturepage, _list) {
  const hostqs = window.location.search;
  slug = hostqs.split('=')[1];
  lecturepage = _lecturepage;
  fetchLecture();
  const finishButton = lecturepage.querySelector('.lecture__footer__finish');
  if (_list.list.includes(slug)) {
    finishButton.classList.add('lecture__footer__finished__selected');
  }
  finishButton.addEventListener('click', finish);
}
