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
  console.log(`Content Script loaded`);

  let word = 'the';

  const regEx = new RegExp(`${word}`, 'gi');

  let listOfA = document.getElementsByTagName('p');

  for (let i = 0; i < listOfA.length; i++) {
 // TODO: Highlight words within
};

onload();
