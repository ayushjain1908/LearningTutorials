var fs = require('fs');
var CardStore = {};
CardStore.cards = {};
CardStore.initialize = function() {
  CardStore.cards = loadData();
}
function loadData(){
  var file = fs.readFileSync('./cards.json');
  return JSON.parse(file.toString());
}

module.exports = CardStore;
