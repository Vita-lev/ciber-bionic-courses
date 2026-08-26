const form = document.getElementById('form');
const prompt = document.getElementById('prompt');
const result = document.getElementById('result');



const apiKey = "YOUR_API_KEY";


const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

async function askGemini(promptValue) {
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
  return { response, data };
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const promptValue = prompt.value;
    console.log(promptValue);
    console.log("питання відправлено");
    result.textContent = "Запит іде...";

    let response;
    let data;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      ({ response, data } = await askGemini(promptValue));
      console.log(data);

      if (response.ok) {
        result.textContent = data.candidates[0].content.parts[0].text;
        return;
      }

      if (data.error?.status !== "UNAVAILABLE" || attempt === 3) {
        result.textContent = data.error?.message || "Сталася помилка";
        return;
      }

      result.textContent = `Модель зайнята, спроба ${attempt + 1}...`;
      await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
    }
})







// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const promptValue = prompt.value;
//   console.log(promptValue);
// });
