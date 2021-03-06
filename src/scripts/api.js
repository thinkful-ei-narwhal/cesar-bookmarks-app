const BASE_URL = 'https://thinkful-list-api.herokuapp.com/cesarlenin';

//function handles fetch and errors
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
    });
}
  
function getItems() {//get
  return listApiFetch(`${BASE_URL}/bookmarks`);
}
  
function createItem(newItem) {//post

  let secondArg = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: newItem
  };
  return listApiFetch(`${BASE_URL}/bookmarks`, secondArg);
}
  
function updateItem(id, updateData) {//patch
  const newData = JSON.stringify(updateData);
  
  let secondArg = {
    method: 'PATCH', 
    headers: {'Content-Type': 'application/json'},
    body: newData
  };
  
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, secondArg);
}
  
function deleteItem(id) {//delete
  let secondArg = {
    method: 'DELETE', 
    headers: {'Content-Type': 'application/json'},
  };

  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, secondArg);
}
  
export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};