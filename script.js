const form = document.querySelector("form");
const input = document.querySelector("input");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(input.value.trim());
});

function getWordInfo(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        result.innerHTML = `<p class="text-red-500">No results found</p>`;
        return;
      }

      const entry = data[0];
      result.classList.add('mx-auto')
      result.classList.add('w-fit')
      // Build HTML dynamically
      let html = `
        <div class="card bg-gray-200 p-4 mx-auto shadow-lg w-96">
          <div class="card-body">
            <h2 class="font-bold text-2xl mb-3">${entry.word}</h2>
      `;

      entry.meanings.forEach((meaning) => {
        html += `
          <div class="mb-3">
            <h3 class="font-semibold text-lg">${meaning.partOfSpeech}</h3>
            <ul class="list-disc list-inside">`;

        meaning.definitions.forEach((def) => {
          html += `<li>${def.definition}</li>`;
        });

        html += `</ul>`;

        if (meaning.synonyms && meaning.synonyms.length > 0) {
          html += `<p class="mt-1"><strong>Synonyms:</strong> ${meaning.synonyms.join(", ")}</p>`;
        }

        html += `</div>`;
      });

      html += `
          </div>
        </div>
      `;

      result.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      result.innerHTML = `<p class="text-red-500">Error fetching data</p>`;
    });
}
