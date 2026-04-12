import { createElement } from './createElement.js';

export function createRecipeInfoCard(recipe) {
  const tags = recipe.tags.forEach((tag) =>
    createElement('li', { className: 'recipe-card-tag', text: tag })
  );

  const ingredients = recipe.ingredients.forEach((ingredient) =>
    createElement('li', {
      className: 'container-ingredient',
      html: `<p class="ingredient-name">${ingredient.ingredient} <span class="ingredient-measure">${ingredient.measure}</span></p>`,
    })
  );

  const div = createElement('div', {
    className: 'recipe-card-info',
    html: `<h2>${recipe.title}</h2><p class="recipe-card-category">${recipe.category}</p><p class="recipe-card-area">${recipe.area}</p><img class="recipe-card-img" src="${recipe.image}" alt="${recipe.title}"/> <p class="recipe-card-instructions">${recipe.instructions}</p><ul class="recipe-card-tag">${tags}</ul>
    <video class="recipe-card-video">${recipe.youtube}</video><ul class="recipe-card-ingredients">${ingredients}</ul>`,
    dataset: { id: recipe.id },
  });

  return div;
}
