import $ from 'jquery';
import store from "./store";
import api from "./api";

const generateBookmarkControls = function() {
    let createBookmarkView= ``;

    if (!store.addingBookmarks) {
        createBookmarkView = `
        <button class="add-button toogle button"><span>ADD BOOKMARK</span></button>
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
        <form class="createNew-form" name="createNew-form">
            <h2>Create a Bookmark:</h2>
            <label for="title">Name:</label>
            <input type="text" id="title" name="title" class="title" placeholder="title">
            <label for="url">URL:</label>
            <input type="text" id="url" name="url" class="url" placeholder="https://example.com">
            <label for="description">Description:</label>
            <input type="text" id="description" name="desc" placeholder="longer description goes here">
            <section class="rate">
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            </section>
            <button type= "submit" class="submit-button button">Submit</button>
            <button class="cancel-button toogle button"><span>cancel</span></button>
        </form>
      `;
    }
    return `${createBookmarkView}`;
  };

   const createBookmarkElement = function(item) {
    let bookmark = ``;

    //star system
    let stars= `<section class="rating">`;
    for(let i=0;i<=item.rating;i++){
     stars +=`<span class="fa fa-star checked"></span>`
    }
        for(let i=item.rating+1;i<=5;i++){
      stars +=`<span class="fa fa-star"></span>`
    }
    stars +=`</section>`

    console.log(item);
    if (!store.expand) {
      bookmark = `
      <li class="bookmark">
        <button class="expand-button">${item.title}</button>
        ${stars}
      </li>
      `;
    }else{
      bookmark =`
        <li class="bookmark">
          <button class="expand-button">${item.title}</button>
          <p>${item.description}</p>
          <button onclick="window.location.href = '${item.url}';">Visit Site</button>
          ${stars}
          <button class="delete-button button"><span>Delete</span></button>
        </li>
      `
    }
    return bookmark
  };

  const render = function() {
    let items = [...store.bookmarks];
    const bookmarkControlString = generateBookmarkControls();
    $(".bookmarkControls").html(bookmarkControlString);
    const bookmarkstringString = generateBookmarksString(items);
    $(".bookmarkList").html(bookmarkstringString);
  };

    const generateBookmarksString = function(bookmarkList) {
    const items = bookmarkList.map(item => createBookmarkElement(item));
    return items.join("");
  };

  const handleCreateBookmarkView = function() {
    $( ".bookmarkControls" ).on( "click", ".toogle", function(event){
        event.preventDefault();
        store.toggleAddBookmark();
      render();
    });
  };

  const handleExpandingBookmark = function() {
    $( ".bookmarkList" ).on( "click", ".expand-button", function(event){
        event.preventDefault();
        store.toggleExtendBookmark();
      render();
    });
  };

  const handleNewBookmark = function() {
    $(".bookmarkControls").on('submit','.createNew-form',function(event){
      event.preventDefault();
      console.log('ran submit');
      store.toggleAddBookmark();
      let objectString=$('.createNew-form').serializeJson()
      console.log(objectString);
      api.createItem(objectString)
        .then((objectString) => {
          store.addItem(objectString);
          //$(".bookmarkControls").html(error);
          render();
        })
    });
  };

  	
  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });
  
  
  const bindEventListeners = function() {
    handleCreateBookmarkView();  
    handleExpandingBookmark();
    handleNewBookmark();
  };

  export default {
    render,
    bindEventListeners
  };