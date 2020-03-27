const bookmarks = [];
const addingBookmark = false;

function toggleAddBookmark() {
    console.log("ran toggleAddBookmark")
    this.addingBookmark = !this.addingBookmarks;
  }

  export default {
    bookmarks,
    toggleAddBookmark
  };
  