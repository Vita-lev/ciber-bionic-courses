const form = document.getElementById('form');
const prompt = document.getElementById('prompt');
const result = document.getElementById('result');



const apiKey = "YOUR_API_KEY";


const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";


form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const promptValue = prompt.value;
    console.log(promptValue);
    console.log("питання відправлено");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
  contents: [
    {
      parts: [
        {
          text: promptValue,
        },
      ],
    },
  ],
}),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
  result.textContent = data.error.message;
  return;
}
    result.textContent = data.candidates[0].content;
    result.textContent = data.candidates[0].content.parts[0].text;
})







// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const promptValue = prompt.value;
//   console.log(promptValue);
// });
