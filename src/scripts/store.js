const bookmarks = [];
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