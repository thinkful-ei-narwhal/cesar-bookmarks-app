import $ from 'jquery';
import store from "./store";
import api from "./api";

const generateBookmarkControls = function() {
    let createBookmarkView= ``;

    if (!store.adding) {
        createBookmarkView = `
        <button class="add-button toogle button"><span>ADD BOOKMARK</span></button>
        <select>
            <option selected disabled>Minimum Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
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
            <input type="radio" id="star1" name="rating" class="rating" value="1" />
            <label for="star1" title="text">1 star</label>
            <input type="radio" id="star2" name="rating" class="rating" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star3" name="rating" class="rating" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star4" name="rating" class="rating" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star5" name="rating" class="rating" value="5" />
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
    let stars= `<section class="star-rating">`;
    for(let i=0;i<item.rating;i++){
     stars +=`<span class="fa fa-star checked"></span>`
    }
        for(let i=item.rating+1;i<=5;i++){
      stars +=`<span class="fa fa-star"></span>`
    }
    stars +=`</section>`

    
    if (!item.expanded) {
      bookmark = `
      <li class="bookmark" data-bookmark-id="${item.id}">
        <button class="expand-button">${item.title}</button>
        ${stars}
      </li>
      `;
    }else{
      bookmark =`
        <li class="bookmark" data-bookmark-id="${item.id}">
          <button class="expand-button">${item.title}</button>
          <p>${item.desc}</p>
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
    items = items.filter(item=> item.rating>=store.filter);

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


  const getItemIdFromElement = function(item) {
    return $(item)
      .closest(".bookmark")
      .data("bookmark-id");
  };
  
  const handleExpandingBookmark = function() {
    $( ".bookmarkList" ).on( "click", ".expand-button", function(event){
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      store.toggleExtendBookmark(item);
      render();
    });
  };

  const handleNewBookmark = function() {
    $(".bookmarkControls").on('submit','.createNew-form',function(event){
      event.preventDefault();
      store.toggleAddBookmark();
      let objectString=$('.createNew-form').serializeJson()
      api.createItem(objectString)
        .then((objectString) => {
          store.addItem(objectString);
          //$(".bookmarkControls").html(error);
          render();
        })
    });
  };

  const handleDeleteBookmarkClicked = function() {
    $( ".bookmarkList" ).on( "click", ".delete-button",  event => {
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      api.deleteItem(id)
        .then(()=>{
          store.findAndDelete(id);
          render();
        })
    });
  };

  const handleFilterSelect = function() {
    $(".bookmarkControls").on( "change", "select",  event => {
    let selected = "";
    $( "select option:selected" ).each(function() {
      selected += $( this ).text() + " ";
    });
    store.SelectFilter(selected);
    render();
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
    handleDeleteBookmarkClicked();
    handleFilterSelect();
  };

  export default {
    render,
    bindEventListeners
  };