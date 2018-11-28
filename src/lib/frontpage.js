import { empty, el } from './helpers';

// const API_URL = '/example.json?domain=';
const LECTURE_URL = '../lectures.json';
let frontpage;
let htmlButton;
let cssButton;
let jsButton;
let show;
let list;

function displayLectures(lectureList) {
  const container = frontpage.querySelector('.lectures__container');
  empty(container)
  const lectures = Array.from(lectureList.lectures);
  lectures.forEach(function (lecture) {
    const {
      category, slug, thumbnail, title,
    } = lecture;
    const thumbElement = el('img', 'lectures__thumbnail','');
    thumbElement.src = thumbnail;
    const typeElement = el('p', 'lectures__type',category);
    const titleElement = el('h1', 'lectures__title',title);
    const boxElement = el('a', 'box', [thumbElement, typeElement, titleElement]);
    boxElement.href = `fyrirlestur.html?slug=${slug}`;
    const colElement = el('div', ['col', 'col12', 'colBig6', 'colBigger4'], boxElement);
    if (!(!show[0]&&!show[1]&&!show[2])) {
      if (category === 'html' && !show[0]){
        colElement.classList.add('colHidden');
      } else if (category === 'css' && !show[1]){
        colElement.classList.add('colHidden');
      } else if (category === 'javascript' && !show[2]){
        colElement.classList.add('colHidden');
      };
    };
    container.appendChild(colElement);
  });
}

function fetchLectures() {
  fetch(`${LECTURE_URL}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Óþekkt villa');
    })
    .then((data) => {
      displayLectures(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function hideLectures(e) {
  e.target.classList.toggle('buttons__button__selected');
  load(frontpage,list);
}

export function load(_frontpage,_list) {
  htmlButton = document.querySelector('.button');
  cssButton = document.querySelectorAll('.button')[1];
  jsButton = document.querySelectorAll('.button')[2];

  htmlButton.addEventListener('click', hideLectures)
  cssButton.addEventListener('click', hideLectures);
  jsButton.addEventListener('click', hideLectures);

  show = [htmlButton.classList.contains('buttons__button__selected'),
    cssButton.classList.contains('buttons__button__selected'),
    jsButton.classList.contains('buttons__button__selected'),
  ];

  frontpage = _frontpage;
  fetchLectures();
}
