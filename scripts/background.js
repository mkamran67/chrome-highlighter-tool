/**
 *  1. on storage change check
 *
 *
 *
 */

// Colors
/**
 *  RGB(255,195,0)
 *  RGB(237,221,83)
 *  RGB(173,212,92)
 *  RGB(87,199,133)
 *  RGB(0,186,173)
 *  RGB(42,123,155)
 *  RGB(61,61,107)
 *  RGB(81,24,73)
 *  RGB(144,12,63)
 *  RGB(199,0,57)
 *  RGB(255,87,51)
 *  RGB(255,141,26)
 *  RGB(255,195,0)
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
}
