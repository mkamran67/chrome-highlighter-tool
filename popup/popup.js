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
  reloadList();

  // Save by "Enter" key
  document.getElementById('addWord').addEventListener('keypress', (e) => {
    // Save Word
    if (e.key === 'Enter') {
      // Save word
      saveToLocal(document.getElementById('addWord').value);
    }
  });

  // Add via Submit click || Delete via click.
  document.getElementById('container').addEventListener('click', (e) => {
    let parentEl = e.target.parentElement.parentElement;

    // Check element type
    // For Enter/Submit click
    if (parentEl.className === 'submit') {
      const incomingWord = document.getElementById('addWord').value;
      // Add Word to list
      saveToLocal(incomingWord);
    } else if (parentEl.tagName === 'LI') {
      // Delete word
      deleteWord(parentEl.firstElementChild.innerText);
    }
  });
}

function saveToLocal(word) {
  /**
   * This function will do 4 things
   * 1. Get previous data
   * 2. Check if incoming word exists if yes -> ignore
   * 3. Else add current word to array and push array to storage
   * 4. Call reload function
   */

  // Check if incoming word is valid.
  if (word !== '') {
    word = word.trim(); // Trim spaces from both ends of the word.
    // Get previous list of word(s)
    chrome.storage.local.get('wordList', ({ wordList }) => {
      let wordArray = []; // Will hold words.

      // Check if wordList exists
      if (typeof wordList !== 'undefined' && wordList.length > 0) {
        // Check if word exists in wordList, if doesn't exist ->
        if (wordList.indexOf(word) === -1) {
          wordArray = [...wordList, word];
        } // if
        else {
          // Word was found and the function is returned; -> ignored
          return;
        }
      } // if
      else {
        // This runs when the wordList is DNE
        wordArray.push(word);
      }

      // Save list to localstorage
      chrome.storage.local.set({ wordList: wordArray }, function () {
        // On Save -> Call reloadList function
        reloadList();
      });
    }); // .get end
  } // if
}

function reloadList() {
  /**
   * This function will do 2 things.
   * 1. Reload list in Popup.
   * 2. Send message to backend to reload search functions.
   */

  // 1. This portion is to reload Popup list.
  const listId = document.getElementById('list'); // Target list <ul>

  // A. Get list of words from localstorage
  let htmlList = ``; // <- Will contain concatenated list.

  chrome.storage.local.get('wordList', ({ wordList }) => {
    // wordList[0] === false => DNE

    if (typeof wordList !== 'undefined' && wordList.length > 0) {
      // B. Iterate through list of words, last-first.

      // Reverse loop array; Last entered would be top of the list.
      for (let i = wordList.length - 1; i >= 0; i--) {
        htmlList += `
      <li id='${i}'>
        <p>${wordList[i]}</p>
        <button><img src="icons/close-icon.png" alt="close" /></button>
      </li>
    `;
      }

      // C. Push concatenated list to DOM
      listId.innerHTML = htmlList;
    } else {
      // C. Push concatenated list to DOM
      listId.innerHTML = htmlList;
    }
  });

  // TODO: implement message to background.js
}

function deleteWord(word) {
  /**
   * This function does
   * 1. Gets previous list from localstorage. Check if exists.
   * 2. Check if length > 1 -> Filters out the given word from the array.
   * 3. Saves the new Array
   * 4. Calls reloadList();
   */

  chrome.storage.local.get('wordList', ({ wordList }) => {
    if (wordList.length > 1) {
      // Loop through and remove
      let newWordList = wordList.filter((el) => el !== word);

      chrome.storage.local.set({ wordList: newWordList }, () => {
        reloadList();
      });
    } else {
      // since array contains only 1 item clear all of storage
      chrome.storage.local.clear(() => {
        reloadList();
      });
    }
  });
}
