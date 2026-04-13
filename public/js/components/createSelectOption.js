import { createElement } from './createElement.js';

export function createSelectOption(category) {
  const option = createElement('option', {
    className: 'category-option',
    text: category,
    value: category,
  });
  return option;
}
