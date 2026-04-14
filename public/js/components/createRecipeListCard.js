import { createElement } from './createElement.js';

const createCard = (recipe) =>
  createElement('li', {
    className: 'recipe-list-card',
    dataset: { id: recipe.id },
  });

const createTitle = (recipe) =>
  recipe.title ? createElement('h3', { text: recipe.title }) : null;

const createImage = (recipe) =>
  recipe.image && recipe.title
    ? createElement('img', {
        className: 'recipe-list-img',
        src: recipe.image,
        alt: recipe.title,
        width: '40',
      })
    : null;

export const createListCard = (recipe) => {
  const card = createCard(recipe);
  const title = createTitle(recipe);
  const image = createImage(recipe);
  card.append(...[title, image].filter(Boolean));

  return card;
};
