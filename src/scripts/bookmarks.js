import $ from 'jquery';
import store from "./store";

const generateBookmarkControls = function() {
    let createBookmarkView= ``;

    if (store.addingBookmarks) {
        createBookmarkView = `
        <button class="add-button"><span>ADD BOOKMARK</span></button>
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
        <form class="js-edit-item">
          <input class="shopping-item" type="text" value="${item.name}" />
        </form>
      `;
    }
  
    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  };

  const generateShoppingItemsString = function(shoppingList) {
    const items = shoppingList.map(item => generateBookmarkControls(item));
    return items.join("");
  };
  
  const render = function() {
    // Filter item list if store prop is true by item.checked === false
    let items = [...store.items];
    if (store.hideCheckedItems) {
      items = items.filter(item => !item.checked);
    }
    // render the shopping list in the DOM
    const shoppingListItemsString = generateShoppingItemsString(items);
    // insert that HTML into the DOM
    $(".js-shopping-list").html(shoppingListItemsString);
  };
  
  const addItemToShoppingList = function(itemName) {
    try {
      item.validateName(itemName);
      store.items.push(item.create(itemName));
    } catch (error) {
      console.log(`Cannot add item: ${error.message}`);
    }
  };

  const handleNewItemSubmit = function() {
    $("#js-shopping-list-form").submit(function(event) {
      event.preventDefault();
      const newItemName = $(".js-shopping-list-entry").val();
      api.createItem(newItemName)
        .then((newItem) => {
          store.addItem(newItem)
          render();
        })
    });
  };
  


  const bindEventListeners = function() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
  };

  export default {
    render,
    bindEventListeners
  };
  