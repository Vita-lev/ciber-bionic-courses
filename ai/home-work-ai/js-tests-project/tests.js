const TestModule = {
  testAdd() {
    console.assert(typeof window.add === "function", "add має бути глобальною функцією з script.js");
    console.assert(window.add(2, 3) === 5, "add(2, 3) має повернути 5");
    console.assert(window.add(-1, 1) === 0, "add(-1, 1) має повернути 0");
    console.assert(window.add(0, 0) === 0, "add(0, 0) має повернути 0");
  },

  testIsEven() {
    console.assert(typeof window.isEven === "function", "isEven має бути глобальною функцією з script.js");
    console.assert(window.isEven(4) === true, "isEven(4) має повернути true");
    console.assert(window.isEven(5) === false, "isEven(5) має повернути false");
    console.assert(window.isEven(0) === true, "isEven(0) має повернути true");
  },

  testCapitalize() {
    console.assert(typeof window.capitalize === "function", "capitalize має бути глобальною функцією з script.js");
    console.assert(window.capitalize("hello") === "Hello", "capitalize('hello') має повернути Hello");
    console.assert(window.capitalize("JS") === "JS", "capitalize('JS') має повернути JS");
    console.assert(window.capitalize("") === "", "capitalize('') має повернути порожній рядок");
  },

  testMax() {
    console.assert(typeof window.max === "function", "max має бути глобальною функцією з script.js");
    console.assert(window.max([1, 9, 3]) === 9, "max([1, 9, 3]) має повернути 9");
    console.assert(window.max([-5, -1, -10]) === -1, "max([-5, -1, -10]) має повернути -1");
    console.assert(window.max([]) === null, "max([]) має повернути null");
  },

  testUnique() {
    console.assert(typeof window.unique === "function", "unique має бути глобальною функцією з script.js");
    console.assert(
      JSON.stringify(window.unique([1, 2, 2, 3, 1])) === JSON.stringify([1, 2, 3]),
      "unique([1, 2, 2, 3, 1]) має повернути [1, 2, 3]"
    );
    console.assert(
      JSON.stringify(window.unique(["js", "html", "js"])) === JSON.stringify(["js", "html"]),
      "unique(['js', 'html', 'js']) має повернути ['js', 'html']"
    );
    console.assert(
      JSON.stringify(window.unique([])) === JSON.stringify([]),
      "unique([]) має повернути []"
    );
  },

  run() {
    this.testAdd();
    this.testIsEven();
    this.testCapitalize();
    this.testMax();
    this.testUnique();

    console.log("Тести завершено. Якщо вище немає помилок Assertion failed — усі перевірки пройдені.");
  },
};

TestModule.run();
