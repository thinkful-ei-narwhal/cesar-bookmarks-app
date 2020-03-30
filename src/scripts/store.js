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

export default {
  toggleAddBookmark,
  findAndDelete,
  SelectFilter,
  toggleExtendBookmark,
  addItem,
  bookmarks,
  findById,
  filter
};