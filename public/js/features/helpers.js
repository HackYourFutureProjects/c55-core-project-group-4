import { createElement } from '../components/createElement.js';

export const createPlaceholderOption = (text) => {
  const option = document.createElement('option');
  option.value = '';
  option.textContent = text;
  option.selected = true;
  return option;
};

export const renderNoResults = (listClass) => {
  const list = document.querySelector(listClass);
  list.replaceChildren();

  const message = createElement('p', {
    className: 'no-results',
    text: 'No recipes found for your search. Try another name.',
  });

  list.append(message);
};
