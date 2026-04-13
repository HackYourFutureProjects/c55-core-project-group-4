import { createElement } from './createElement.js';

export function createListCard(recipe) {
  const li = createElement('li', {
    className: 'recipe-card',
    html: `<h3>${recipe.title}</h3><img src="${recipe.image}" alt="${recipe.title}"/>`,
    dataset: { id: recipe.id },
  });

  return li;
}
