import { createElement } from './createElement.js';

export function createSelectOption(filterName) {
  const option = createElement('option', {
    className: 'category-option',
    text: filterName,
    value: filterName,
  });
  return option;
}
