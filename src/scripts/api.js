const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cesarlenin';

function listApiFetch(...args) {
    let error = false;
    return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    })
  }
  
  function getItems() {
    return listApiFetch(`${BASE_URL}/bookmarks`)
  };
  
  function createItem(name,newBookmarkUrl) {
    let description= "this is a description";
    let rating= 5;
    const newItem = JSON.stringify({ "title": name, "url": newBookmarkUrl, "desc": description, "rating":rating});
  
    let secondArg = {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: newItem
    }
  
    return listApiFetch(`${BASE_URL}/bookmarks`, secondArg);
  };
  
  function updateItem(id, updateData) {
    const newData = JSON.stringify(updateData);
  
    let secondArg = {
      method: 'PATCH', 
      headers: {'Content-Type': 'application/json'},
      body: newData
    }
  
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`, secondArg);
  }
  
  function deleteItem(id) {
    let secondArg = {
      method: 'DELETE', 
      headers: {'Content-Type': 'application/json'},
    }

    return listApiFetch(`${BASE_URL}/bookmarks/${id}`, secondArg);
  }
  
  export default {
    getItems,
    createItem,
    updateItem,
    deleteItem
  };