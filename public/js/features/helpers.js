import { createElement } from '../components/createElement.js';
import { createToast } from '../components/createToast.js';

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

export const getChatErrorMessage = (err) => {
  const status = err.status;
  const message = err.message || '';

  switch (true) {
    case status === 400:
      return createElement('p', {
        class: 'chat-error',
        text: 'I can only help with recipe ideas! 🍽️',
      });

    case status === 500:
      return createElement('p', {
        class: 'chat-error',
        text: 'Server error. Try again soon. ⚠️',
      });

    case message.includes('Failed to fetch'):
      return createElement('p', {
        class: 'chat-error',
        text: 'Connection issue. Please try again later. 🌐',
      });

    default:
      return createElement('p', {
        class: 'chat-error',
        text: 'Something went wrong. Please try again. ❗',
      });
  }
};

export const getErrorMessage = (err) => {
  const status = err.status;
  const message = err.message || '';

  switch (true) {
    case status === 400:
      return createToast('warning', 'Invalid request ❗');

    case status === 404:
      return createToast('warning', 'Recipe not found 🔍');

    case status === 500:
      return createToast('error', 'Server error. Please try again later ⚠️');

    case message.includes('Failed to fetch'):
      return createToast(
        'error',
        'Network error. Please check your connection 🌐'
      );

    default:
      return createToast('error', 'Something went wrong ❗');
  }
};
