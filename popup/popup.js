document.addEventListener('DOMContentLoaded', onLoaded, false);

function onLoaded() {
  // Check for previous list of items and load them

  document.getElementById('addWord').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      // Save to storage and reload list.
    }
  });
}

function setKeyCounter(counter) {
  chrome.storage.local.set({ counter: counter });
}

function getCounter() {
  let counter = 0;

  chrome.storage.local.get(['counter'], (res) => (counter = res));

  return counter;
}

function saveToLocal(item) {}

function getFromLocal() {
  chrome.storage.local.set();
}

function deleteItem(key) {}

function loadList() {}

chrome.storage.local.set({ key: value }, function () {
  console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function (result) {
  console.log('Value currently is ' + result.key);
});
