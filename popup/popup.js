document.addEventListener('DOMContentLoaded', onLoaded, false);

function onLoaded() {
  // Check for previous list of items and load them

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
      // Add Word to list
      saveToLocal(document.getElementById('addWord').value);
    } else if (parentEl.tagName === 'LI') {
      console.log(`Close LI Button pressed`);
      // TODO: Delete word
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

  let wordArray = []; // Will hold words.

  chrome.storage.local.get('wordList', (res) => {
    console.log(res.wordList);

    // Check if list exists. (This case wordArray[0] => False)
    if (typeof res.wordList === 'undefined') {
      // DNE
      wordArray.push(word);
    } else {
      wordArray = [...res.wordList, word];
    }

    // Save list to localstorage
    chrome.storage.local.set({ wordList: wordArray }, function () {
      // On save reload list.
      console.log(`Saved ${word}`);

      // Call reloadList function
      reloadList();
    });
  });
}

// function saveToLocal(word) {
//   /**
//    * This function will do 4 things
//    * 1. Get previous data
//    * 2. Check if incoming word exists if yes -> ignore
//    * 3. Else add current word to array and push array to storage
//    * 4. Call reload function
//    */

//   let wordArray = []; // Will hold words.

//   wordArray = getFromLocal();

//   // Check if list exists. (This case wordArray[0] => False)
//   if (!wordArray[0]) {
//     wordArray[0] = word;
//   } else {
//     wordArray.push(word);
//   }

//   // Save list to localstorage
//   chrome.storage.local.set({ wordList: wordArray }, function () {
//     // On save reload list.
//     console.log(`Saved ${word}`);

//     // Call reloadList function
//     reloadList();
//   });
// }

function getFromLocal() {
  /**
   * This function does 2 things
   * 1. Checks if wordList exists if True -> Returns it
   * 2. Else -> returns True for not Does Not Exist
   */
  chrome.storage.local.get('wordList', (res) => {
    console.log(res.wordList);
  });
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
  let wordList = getFromLocal(); // <- Previous List
  let htmlList = ``; // <- Will contain concatenated list.

  console.log(wordList);

  // wordList[0] === false => DNE
  if (!wordList[0]) {
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

    console.log(wordList);
    // C. Push concatenated list to DOM
    listId.innerHTML = htmlList;
  } else {
    console.log(wordList);
    // C. Push concatenated list to DOM
    listId.innerHTML = htmlList;
  }

  // TODO: implement message to background.js
}

function checkForList() {
  chrome.storage.local.get('wordList', (result) => {
    if (result.wordList === 'undefined') {
      return false;
    } else {
      return true;
    }
  });
}

function deleteItem(word) {
  /**
   * This function does
   * 1. Gets previous list from localstorage. Check if exists.
   * 2. Check if length > 1 -> Filters out the given word from the array.
   * 3. Saves the new Array
   * 4. Calls reloadList();
   */
}
