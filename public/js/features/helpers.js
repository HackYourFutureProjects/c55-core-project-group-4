export function createPlaceholderOption(text) {
  const option = document.createElement('option');
  option.value = '';
  option.textContent = text;
  option.selected = true;
  return option;
}
