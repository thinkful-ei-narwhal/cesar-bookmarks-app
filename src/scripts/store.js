const bookmarks = [];
const filter= 0;
const adding = false;
const error= null;

function toggleAddBookmark() { //states wich generateBookmarkControls view should display
  this.adding = !this.adding;
}

function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(item => item.id !== id);
}
  
function toggleExtendBookmark(item) { //states wich bookmark view should display
  item.expanded = !item.expanded;
}

function findById(id) {
  return this.bookmarks.find(item => item.id === id);
}

function addItem(objectString) {
  objectString.expanded = false;
  this.bookmarks.push(objectString);
}

function SelectFilter(rating) {//states wich bookmark should be displayed
  this.filter=rating;
}

function displayError(error) { //provides user feedback if error occcurs
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