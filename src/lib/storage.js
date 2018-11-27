
const LOCALSTORAGE_KEY = 'finished_lectures';




export function load() {
  const savedData = window.localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedData) {
    return JSON.parse(savedData);
  }

  return [];
}

/**
 * Vista stig
 *
 * @param {string} name Nafn þess sem á að vista
 * @param {number} points Stig sem á að vista
 */
export function add(slug) {
  const finished = load();
  if (!finished.includes(slug)){
    finished.push(slug);
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(finished));
}

export function remove(slug) {
  const finished = load();
  var index = finished.indexOf(slug);
  if (index > -1) {
    finished.splice(index, 1);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(finished));
}
