import { empty, el } from './helpers';

// const API_URL = '/example.json?domain=';
const LECTURE_URL = '../lectures.json';
let frontpage;

function displayLectures(lectureList) {
  const container = frontpage.querySelector('.lectures__container');
  const lectures = Array.from(lectureList.lectures)
  lectures.forEach(function(lecture) {
    var {
      category, content, image, slug, thumbnail, title,
    } = lecture;
    const boxElement = el('p','box',title)
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

export function load(_frontpage) {
  frontpage=_frontpage;
  fetchLectures();
}
