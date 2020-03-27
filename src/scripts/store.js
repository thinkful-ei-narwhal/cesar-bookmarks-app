const bookmarks = [
  {
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit',
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

 export default {
    toggleAddBookmark,
    toggleExtendBookmark
};