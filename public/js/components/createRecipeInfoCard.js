import { createElement } from './createElement.js';

const createContainer = (recipe) =>
  createElement('div', {
    className: 'recipe-card-info',
    dataset: { id: recipe.id },
  });

const createTitle = (recipe) =>
  recipe.title ? createElement('h2', { text: recipe.title }) : null;

const createCategory = (recipe) =>
  recipe.category
    ? createElement('p', {
        className: 'recipe-card-category',
        text: recipe.category,
      })
    : null;

const createCountry = (recipe) =>
  recipe.area
    ? createElement('p', {
        className: 'recipe-card-area',
        text: recipe.area,
      })
    : null;

const createAuthor = (recipe) =>
  recipe.added_by
    ? createElement('p', {
        className: 'recipe-card-author',
        text: recipe.added_by,
      })
    : null;

const createImage = (recipe) =>
  recipe.image && recipe.title
    ? createElement('img', {
        className: 'recipe-card-img',
        src: recipe.image,
        alt: recipe.title,
      })
    : null;

const createTagsList = (recipe) =>
  recipe.tags ? createElement('ul', { className: 'recipe-card-tags' }) : null;

const createTag = (recipe) =>
  recipe.tags
    ? recipe.tags.map((tag) =>
        createElement('li', { className: 'recipe-card-tag', text: tag })
      )
    : null;

const createIngredientsList = (recipe) =>
  recipe.ingredients
    ? createElement('ul', {
        className: 'recipe-card-ingredients',
      })
    : null;

const createIngredient = (recipe) =>
  recipe.ingredients
    ? recipe.ingredients.map((ingredient) => {
        const item = createElement('li', { className: 'container-ingredient' });
        const ingredientName = createElement('p', {
          className: 'ingredient-measure',
          text: ingredient.ingredient,
        });

        const measure = createElement('span', {
          className: 'ingredient-measure',
          text: ingredient.measure,
        });

        item.append(ingredientName, measure);

        return item;
      })
    : null;

const createInstructions = (recipe) =>
  recipe.instructions
    ? createElement('p', {
        className: 'recipe-card-instructions',
        text: recipe.instructions,
      })
    : null;

const createVideo = (recipe) => {
  if (!recipe.youtube) return null;

  const videoId = recipe.youtube.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return createElement('iframe', {
    className: 'recipe-card-video',
    src: embedUrl,
    allowfullscreen: true,
  });
};

export const createRecipeInfoCard = (recipe) => {
  const container = createContainer(recipe);

  const title = createTitle(recipe);

  const category = createCategory(recipe);

  const country = createCountry(recipe);

  const author = createAuthor(recipe);

  const image = createImage(recipe);

  const tagsList = createTagsList(recipe);

  const tags = createTag(recipe);

  if (tagsList && tags) tagsList.append(...tags);

  const ingredientsList = createIngredientsList(recipe);

  const ingredients = createIngredient(recipe);

  if (ingredientsList && ingredients) ingredientsList.append(...ingredients);

  const instructions = createInstructions(recipe);

  const video = createVideo(recipe);

  container.append(
    ...[
      title,
      category,
      country,
      author,
      image,
      tagsList,
      ingredientsList,
      instructions,
      video,
    ].filter(Boolean)
  );

  return container;
};
