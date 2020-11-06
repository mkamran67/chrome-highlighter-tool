/**
 * This is the content script
 */

const Mark = require('mark.js');

const addChangesListener = () => {
  document.addEventListener('DOMNodeInserted', onDomChanges);
};

const removeChangesListener = () => {
  console.log(`test`);
  document.removeEventListener('DOMNodeInserted', (e) => {
    console.log(e);
  });
};

const reloadList = (instance) => {
  // Get list from storage
  chrome.storage.local.get('wordList', ({ wordList }) => {
    // Check if valid list
    if (typeof wordList !== 'undefined') {
      // Loop through wordList Array and mark with different classes
      // highlight-color-#
      wordList.forEach((element, index) => {
        let number = index % 13;
        instance.mark(element, {
          className: `highlight-color-${number}`,
        });
      });
    }
  });
};

const wordChange = (instance) => {
  // Unmark then re-mark
  try {
    instance.unmark({
      done: function () {
        // Get list from storage
        chrome.storage.local.get('wordList', ({ wordList }) => {
          // Check if valid list
          if (typeof wordList !== 'undefined') {
            // Loop through wordList Array and mark with different classes
            // highlight-color-#
            wordList.forEach((element, index) => {
              let number = index % 13;
              instance.mark(element, {
                className: `highlight-color-${number}`,
              });
            });
          }
        });
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const onDomChanges = (e) => {
  document.removeEventListener('DOMNodeInserted', onDomChanges, false);

  let instance = new Mark(document.querySelector('body'));

  // Unmark then re-mark
  instance.unmark({
    done: function () {
      // Get list from storage
      chrome.storage.local.get('wordList', ({ wordList }) => {
        // Check if valid list
        if (typeof wordList !== 'undefined') {
          // Loop through wordList Array and mark with different classes
          // highlight-color-#
          wordList.forEach((element, index) => {
            let number = index % 13;
            instance.mark(element, {
              className: `highlight-color-${number}`,
            });
          });
        }

        // Add event Listener
        document.addEventListener('DOMNodeInserted', onDomChanges, false);
      });
    },
  });
};

const onLoad = () => {
  console.log(`Content Script`);
  let instance = new Mark(document.querySelector('body'));

  // Marks words on page load
  reloadList(instance);

  // Listens to storage changes
  chrome.storage.local.onChanged.addListener(() => {
    wordChange(instance);
  });

  // TODO: -> React DOM changes
  setTimeout(() => {
    // document.addEventListener('DOMNodeInserted', onDomChanges);
    document.addEventListener('DOMNodeInserted', onDomChanges, false);
  }, 1500);
};

onLoad();
