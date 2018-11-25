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
  const element = el('iframe','lecture__youtube__video','');
  element.src = data;
  element.frameborder = "0";
  element.allowfullscreen = "0";
  const container = el('div','lecture__youtube__container',element)
  return container;
}
function createText(data){
  const container = el('div','lecture__text__container', null )
  const textar = data.split('\n')
  textar.forEach(function(text) {
    const element = el('p','lecture__text',`${text}`);
    container.appendChild(element);
  });
  return container;
}
function createQuote(data,attribute){
  const container = el('div','lecture__quote__container', null )
  const element = el('p','lecture__quote',`${data}`);
  container.appendChild(element);
  const element2 = el('p','lecture__quote__attribute',`${attribute}`);
  container.appendChild(element2);
  return container;
}
function createImage(data,caption){
  const container = el('div','lecture__quote__container', null )
  const element = el('img','lecture__image','');
  element.src = data;
  container.appendChild(element);
  const element2 = el('p','lecture__image__caption',`${caption}`);
  container.appendChild(element2);
  return container;
}
function createHeading(data){
  const element = el('h2','lecture__heading',`${data}`);
  return element;
}
function createList(data){
  const list = el('ul','lecture__list', null )
  data.forEach(function(listEl) {
    const element = el('li','lecture__list__element',`${listEl}`);
    list.appendChild(element);
  });
  return list;
}
function createCode(data){
  const container = el('div','lecture__code__container', null )
  const lines = data.split('\n')
  lines.forEach(function(line) {
    var element;
    if (line === "") {
      element = el('br','','');
    } else {
      element = el('p','lecture__code',`${line}`);
    }
    container.appendChild(element);
  });
  return container;
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
      data, type, caption, attribute,
    } = entry;
    let element;
    if (type === 'youtube'){
      element = createYoutube(data);
    } else if (type === 'text') {
      element = createText(data);
    } else if (type === 'quote') {
      element = createQuote(data,attribute);
    } else if (type === 'image') {
      element = createImage(data,caption);
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
