function add(a, b) {
  return a + b;
}

function isEven(n) {
  return n % 2 === 0;
}

function capitalize(text) {
  if (!text) {
    return "";
  }

  return text[0].toUpperCase() + text.slice(1);
}

function max(numbers) {
  if (!numbers.length) {
    return null;
  }

  return Math.max(...numbers);
}

function unique(items) {
  return [...new Set(items)];
}

window.add = add;
window.isEven = isEven;
window.capitalize = capitalize;
window.max = max;
window.unique = unique;
