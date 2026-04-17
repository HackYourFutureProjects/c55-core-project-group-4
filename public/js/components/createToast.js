import { createElement } from './createElement.js';

export const createToast = (className, message) => {
  const container = document.getElementById('toast-container');

  const toast = createElement('p', {
    class: `toast-${className}`,
    text: message,
  });

  container.append(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
};
