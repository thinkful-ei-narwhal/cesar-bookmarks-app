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
            <button type= "submit" class="submit-button button">Submit</button>
        </form>
      `;
    }
    return `${createBookmarkView}`;
  };

  const render = function() {
    console.log('ran render');

     const bookmarkControlString = generateBookmarkControls();
    $(".bookmarkControls").html(bookmarkControlString);
  };

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
  