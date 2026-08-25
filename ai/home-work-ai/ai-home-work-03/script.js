const form = document.getElementById('form');
const prompt = document.getElementById('prompt');
const result = document.getElementById('result');

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const promptValue = prompt.value;
    console.log(promptValue);
    console.log("питання відправлено");
})

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const promptValue = prompt.value;
//   console.log(promptValue);
// });
