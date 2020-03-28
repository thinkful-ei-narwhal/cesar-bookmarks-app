const bookmarks = [];
const adding = false;

function toggleAddBookmark() {
    this.adding = !this.adding;
  }
  
function toggleExtendBookmark(item) {
  item.expanded = !item.expanded;
  }

function findById(id) {
    return this.bookmarks.find(item => item.id === id);
  }

function addItem(objectString) {
  objectString.expanded = false;
  this.bookmarks.push(objectString);
  }

 export default {
    toggleAddBookmark,
    toggleExtendBookmark,
    addItem,
    bookmarks,
    findById
};