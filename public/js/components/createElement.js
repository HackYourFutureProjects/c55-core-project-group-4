export function createElement(
  tag,
  { className, text, html, value, dataset } = {}
) {
  const el = document.createElement(tag);

  if (className) el.className = className;
  if (text) el.textContent = text;
  if (value) el.value = value;
  if (html) el.innerHTML = html;
  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      el.dataset[key] = value;
    });
  }

  return el;
}
