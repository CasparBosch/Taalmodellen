import LanguageModel from './languageModel.js';

let model;

function trainModel() {
    const text = document.getElementById('text').value;
    const n = parseInt(prompt("Enter the value of n for n-gram model:"));
    model = new LanguageModel(n);
    model.train(text);
    alert("Model trained successfully!");
}

function predictNextWord() {
    const prefix = document.getElementById('prefix').value;
    if (model) {
        const predictions = model.predictNextWord(prefix);
        const predictionsDiv = document.getElementById('predictions');
        predictionsDiv.innerHTML = '<h2>Predictions:</h2>';
        if (Object.keys(predictions).length > 0) {
            for (const [word, probability] of Object.entries(predictions)) {
                predictionsDiv.innerHTML += `<p>- ${word}: Probability ${probability.toFixed(2)}</p>`;
            }
        } else {
            predictionsDiv.innerHTML += '<p>No predictions available for the given prefix.</p>';
        }
    } else {
        alert("Please train the model first.");
    }
}

document.getElementById('trainButton').addEventListener('click', trainModel);
document.getElementById('predictButton').addEventListener('click', predictNextWord);
