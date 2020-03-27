import $ from 'jquery';
import "../styles/index.css"

function main() {
  console.log('DOM is loaded');

  const startMsg = $('<p>Webpack is working!</p>');
  $('#root').append(startMsg);
}

$(main);