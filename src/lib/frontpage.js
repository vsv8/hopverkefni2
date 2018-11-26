import { empty, el } from './helpers';

// const API_URL = '/example.json?domain=';
const LECTURE_URL = '../lectures.json';
let frontpage;
let htmlButton;
let cssButton;
let jsButton;

function displayLectures(lectureList) {
  const container = frontpage.querySelector('.lectures__container');
  const lectures = Array.from(lectureList.lectures)
  lectures.forEach(function(lecture) {
    var {
      category, content, image, slug, thumbnail, title,
    } = lecture;
    const boxElement = el('a','box',title);
    boxElement.href = `fyrirlestur.html?slug=${slug}`;
    const colElement = el('div',['col', 'col12', 'colBig6', 'colBigger4'],boxElement);
    container.appendChild(colElement);
  });
}

function fetchLectures(){
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

let clicked = false;
function hideLectures(e) {
  if (e.target.contains(htmlButton)) {
    if (clicked === false) {
      htmlButton.classList.add('buttons__button__selected');
      clicked = true;
    } else {
      htmlButton.classList.remove('buttons__button__selected');
      clicked = false;
    }
  }
  if (e.target.contains(cssButton)) {
    if (clicked === false) {
      cssButton.classList.add('buttons__button__selected');
      clicked = true;
    } else {
      cssButton.classList.remove('buttons__button__selected');
      clicked = false;
    }
  }
  if (e.target.contains(jsButton)) {
    if (clicked === false) {
      jsButton.classList.add('buttons__button__selected');
      clicked = true;
    } else {
      jsButton.classList.remove('buttons__button__selected');
      clicked = false;
    }
  }
}

export function load(_frontpage) {
  htmlButton = document.querySelector('.button');
  cssButton = document.querySelectorAll('.button')[1];
  jsButton = document.querySelectorAll('.button')[2];

  htmlButton.addEventListener('click', hideLectures)
  cssButton.addEventListener('click', hideLectures);
  jsButton.addEventListener('click', hideLectures);

  frontpage=_frontpage;
  fetchLectures();
}
