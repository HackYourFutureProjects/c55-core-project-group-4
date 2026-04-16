export function createElement(tag, options = {}) {
  const el = document.createElement(tag);

  const { className, text, dataset, value, ...attributes } = options;

  if (className) el.className = className;
  if (text) el.textContent = text;
  if (value) el.value = value;
  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      el.dataset[key] = value;
    });
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === true) {
      el.setAttribute(key, '');
    } else if (value !== false && value != null) {
      el.setAttribute(key, value);
    }
  });

  return el;
}
