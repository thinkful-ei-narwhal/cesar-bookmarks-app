const bookmarks = [
  {
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit',
    expanded: false
  },
  {
    id: '6ffw',
    title: 'Title 2',
    rating: 5,
    url: 'http://www.title2.com',
    description: 'dolorum tempore deserunt',
    expanded: false
  } 
];
const addingBookmarks = false;
const expand =false;

function toggleAddBookmark() {
    this.addingBookmarks = !this.addingBookmarks;
  }
  
function toggleExtendBookmark() {
    this.expand = !this.expand;
  }

function addItem(objectString) {
    this.bookmarks.push(objectString);
  }

 export default {
    toggleAddBookmark,
    toggleExtendBookmark,
    addItem,
    bookmarks
};