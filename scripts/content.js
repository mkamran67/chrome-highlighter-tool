/**
 * This script will run in the browser,
 * A few things this script will do.
 * 0. Start on all?Active tabs
 * 1. Check for local storage updates for words.
 * 2. On word addition/subtraction search and high light give list of words.
 * 3. Highlight word per color
 *
 */

// Check words and load em on current active tab
let onload = () => {
  console.log(`Highlighter loaded`);

  let listOfA = document.getElementsByTagName('p');
  let listOfH3 = document.getElementsByTagName('h3');
  let listOfEM = document.getElementsByTagName('em');

  // List of Words
  chrome.storage.local.get('wordList', ({ wordList }) => {
    if (typeof wordList !== 'undefined') {
      wordList.forEach((word, index) => {
        let color = index % 13;
        const regEx = new RegExp(`${word}`, 'gi');

        for (let i = 0; i < listOfA.length; i++) {
          let index = listOfA[i].innerHTML.replaceAll(
            regEx,
            `<span class="highlight-color-${color}">  ${word} </span>`
          );

          listOfA[i].innerHTML = index;
        }

        for (let i = 0; i < listOfH3.length; i++) {
          // console.log(listOfH3[i]);
          let index = listOfH3[i].innerHTML.replaceAll(
            regEx,
            `<span class="highlight-color-${color}">${word}</span>`
          );

          listOfH3[i].innerHTML = index;
        }
        for (let i = 0; i < listOfEM.length; i++) {
          // console.log(listOfEM[i]);
          let index = listOfEM[i].innerHTML.replaceAll(
            regEx,
            `<span class="highlight-color-${color}">${word}</span>`
          );

          listOfEM[i].innerHTML = index;
        }
      });
    }
  });
};

// TODO: implement on word addition to rerun partial
// function onEntry() {}

onload();
