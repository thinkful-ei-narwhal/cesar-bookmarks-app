const bookmarks = [];
const filter= 0;
const adding = false;
const error= null;

function toggleAddBookmark() {
  this.adding = !this.adding;
}

function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(item => item.id !== id);
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

function SelectFilter(rating) {
  this.filter=rating;
}

function displayError(error) {
  this.error=error;
}

export default {
  toggleAddBookmark,
  findAndDelete,
  SelectFilter,
  displayError,
  toggleExtendBookmark,
  addItem,
  findById,
  bookmarks,
  filter
};