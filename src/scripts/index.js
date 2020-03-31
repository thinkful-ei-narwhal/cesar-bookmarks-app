import $ from 'jquery';
import bookmarks from './bookmarks';
import '../styles/index.css';
import store from './store';
import api from './api';

function main() {
  api.getItems()//get items from api
    .then((items) => {
      items.forEach((item) => store.addItem(item));//add them to store
      bookmarks.render();
    });
  bookmarks.bindEventListeners();
  bookmarks.render();
}

$(main);