import $ from 'jquery';
import bookmarks from "./bookmarks";
import "../styles/index.css"
import store from "./store";
import api from './api';

function main() {
  // console.log('DOM is loaded');

  api.getItems()
  .then((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarks.render();
  });
  bookmarks.bindEventListeners();
  bookmarks.render();
}

$(main);