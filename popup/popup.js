/**
 * This script will only run on popup launch.
 * List of things this script will do(es)
 * 1. Load list of current words from local storage
 * 2. Add words to local storage
 * 3. Remove words from local storage
 *
 */
document.addEventListener('DOMContentLoaded', onLoaded, false);

function onLoaded() {
  // Check for previous list of items and load them

  // Save by "Enter key"
  document.getElementById('addWord').addEventListener('keypress', (e) => {
    // Save Word
    if (e.key === 'Enter') {
      // Save to storage and reload list.
      // Get ID -> Value from last input ID
      // Get Key -> Word from input
      document.getElementById('submitBTN');
    }
  });

  // Delete List item || Delete via clicks
  document.getElementById('container').addEventListener('click', (e) => {
    // Get ID -> Value
    // Get Key -> Word
    console.log(e.path);
  });
}

function saveToLocal(item) {
  let previousList = getFromLocal(); // Get previous list

  previousList.push(item);

  chrome.storage.local.set({ wordList: value }, function () {
    // On save reload list.
    console.log('Value is set to ' + value);
  });
}

function getFromLocal() {
  chrome.storage.local.get(['wordList'], function (result) {
    console.log('Value currently is ' + result.key);
  });
}

function deleteItem(id) {}

function loadList() {
  const listId = document.getElementById('list');
}
