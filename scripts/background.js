console.log(`hello bawdad`);

document.addEventListener('DOMContentLoaded', toListen, false);

function toListen() {
  // Listen for localstorage changes
  chrome.storage.onChanged.addListener(storageWordCheck);
}

function storageWordCheck() {
  console.log(`Local storage event listener test.`);
}
