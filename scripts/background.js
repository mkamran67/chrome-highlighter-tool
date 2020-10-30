/**
 *
 *
 *
 *
 */

console.log(`hello bawdad`);

document.addEventListener('DOMContentLoaded', toListen, false);

function toListen() {
  storageWordCheck();
  // Listen for localstorage changes
  chrome.storage.onChanged.addListener(storageWordCheck);
}

function storageWordCheck() {
  console.log(`Local storage event listener test.`);
  chrome.storage.local.get('wordList', ({ wordList }) => {
    wordList.forEach((el) => console.log(el));
  });
}
