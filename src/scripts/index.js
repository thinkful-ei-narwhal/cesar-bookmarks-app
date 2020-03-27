import $ from 'jquery';
import bookmarks from "./bookmarks";
import "../styles/index.css"

function main() {
  console.log('DOM is loaded');
  bookmarks.bindEventListeners();
  bookmarks.render();
}

$(main);