import $ from 'jquery';
import store from "./store";

const generateBookmarkControls = function() {
    let createBookmarkView= ``;

    if (!store.addingBookmarks) {
        createBookmarkView = `
        <button class="add-button button"><span>ADD BOOKMARK</span></button>
        <select>
            <option selected disabled>Minimum Rating</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
        </select>
      `;
    }else{
        createBookmarkView = `
        <form class="createNew-form">
            <h2>Create a Bookmark:</h2>
            <label for="title">Name:</label>
            <input type="text" id="title" name="title" placeholder="title">
            <label for="url">URL:</label>
            <input type="text" id="url" name="url" placeholder="https://example.com">
            <label for="description">Description:</label>
            <input type="text" id="description" name="description" placeholder="longer description goes here">
            <section class="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
            </section>
            <button type= "submit" class="submit-button button">Submit</button>
        </form>
      `;
    }
    return `${createBookmarkView}`;
  };

   const createBookmarkElement = function() {
    let bookmark = ``;
    if (!store.expand) {
      bookmark = `
      <li class="bookmark">
        <button class="expand-button">Apple</button>
        <section class="rating">
          <span class="fa fa-star one"></span>
          <span class="fa fa-star two"></span>
          <span class="fa fa-star three"></span>
          <span class="fa fa-star four"></span>
          <span class="fa fa-star five"></span>
        </section>
      </li>
      `;
    }else{
      bookmark =`
        <li class="bookmark">
          <button class="expand-button">Apple</button>
          <p>jdnfjsdnfksdnfknsdkfnskdl;korjgtnglwt,gkpofkgof</p>
          <section class="rating">
            <span class="fa fa-star one"></span>
            <span class="fa fa-star two"></span>
            <span class="fa fa-star three"></span>
            <span class="fa fa-star four"></span>
            <span class="fa fa-star five"></span>
          </section>
        </li>
      `
    }
    return bookmark
  };

  const render = function() {
    console.log('ran render');
    // let bookmarks = [...store.bookmarks];
    const bookmarkControlString = generateBookmarkControls();
    $(".bookmarkControls").html(bookmarkControlString);
    const bookmarkstringString = createBookmarkElement();
    $(".bookmarkList").html(bookmarkstringString);
  };

  //   const generateBookmarksString = function(bookmarkList) {
  //   const items = bookmarkList.map(item => createBookmarkElement(item));
  //   return items.join("");
  // };

  const handleCreateBookmarkView = function() {
    $( ".bookmarkControls" ).on( "click", ".button", function(event){
        event.preventDefault();
        console.log("ran add-button")
        store.toggleAddBookmark();
      render();
    });
  };

  const bindEventListeners = function() {
    handleCreateBookmarkView();  
  };

  export default {
    render,
    bindEventListeners
  };