import { empty, el } from './helpers';

const LECTURE_URL = '../lectures.json';
let lecturepage;


function findlecture(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

function createYoutube(data){
  const element = el('iframe','lecture__youtube','');
  element.src = data;
  element.frameborder = "0";
  element.allowfullscreen = "0";
  return element;
}
function createText(data){
  const element = el('p','lecture__text',`${data}`);
  return element;
}
function createQuote(data){
  const element = el('h3','lecture__quote',`${data}`);
  return element;
}
function createImage(data){
  const element = el('img','lecture__image','image');
  element.src = data;
  return element;
}
function createHeading(data){
  const element = el('h2','lecture__heading',`${data}`);
  return element;
}
function createList(data){
  const element = el('p','lecture__list',`${data}`);
  return element;
}
function createCode(data){
  const element = el('p','lecture__code',`${data}`);
  return element;
}


function displayLectureHeader(image,title,category) {
  const header = lecturepage.querySelector('.header__lecture');
  header.style.backgroundImage=`url(${image})`;
  const headerSubtitle = el('h3','header__subtitle',category);
  const headerTitle = el('h1','header__title',title);
  header.appendChild(headerSubtitle);
  header.appendChild(headerTitle);
}

function displayLectureContent(content) {
  const container = lecturepage.querySelector('.lecture__container');
  content.forEach(function(entry) {
    var {
      data, type,
    } = entry;
    let element;
    if (type === 'youtube'){
      element = createYoutube(data);
    } else if (type === 'text') {
      element = createText(data);
    } else if (type === 'quote') {
      element = createQuote(data);
    } else if (type === 'image') {
      element = createImage(data);
    } else if (type === 'heading') {
      element = createHeading(data);
    } else if (type === 'list') {
      element = createList(data);
    } else if (type === 'code') {
      element = createCode(data);
    }
    const colElement = el('div',['col', 'col12', 'colBig8', 'offsetBig2'],element);
    container.appendChild(colElement);
  });
}


function displayLecture(lecture) {
  var {
    category, content, image, slug, thumbnail, title,
  } = lecture;
  displayLectureHeader(image,title,category);
  displayLectureContent(content);
}


function fetchLecture(slug) {
  fetch(`${LECTURE_URL}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Óþekkt villa');
    })
    .then((data) => {
      const lectures = Array.from(data.lectures);
      const lecture = findlecture(lectures, 'slug', slug)
      displayLecture(lecture);
    })
    .catch((error) => {
      console.error(error);
    });
}




export function load(_lecturepage) {
  const hostqs = window.location.search;
  const slug = hostqs.split("=")[1];
  lecturepage=_lecturepage;
  fetchLecture(slug);
}
