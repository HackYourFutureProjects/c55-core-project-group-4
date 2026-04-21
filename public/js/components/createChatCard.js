import { createElement } from "./createElement.js";


export const createChatCard = (recipe) => {
  const chatCard = createElement('div', { class: 'chat-recipe' });

  const title = createElement('h3',{text: recipe.title});
  

  const instructions = createElement('p', {text: recipe.instructions});
  


  const ul = createElement('ul');
  recipe.ingredients.forEach(({ ingredient, measure }) => {
  const li = createElement('li', {text: `${ingredient} — ${measure}`})
    ul.append(li);
  });

  chatCard.append(title, instructions, ul);
  return chatCard;
};