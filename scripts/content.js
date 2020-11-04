/**
 * This is the content script
 */

const Mark = require('mark.js');

const onLoad = () => {
  console.log(`Content Script`);

  let context = document.getElementsByTagName('body');
  let instance = new Mark(context);

  chrome.storage.local.get('wordList', ({ wordList }) => {
    console.log(`Marking`);
    instance.mark(wordList);
  });
};

onLoad();
