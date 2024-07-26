const quotes = [
    {text: "Life is all about working together.", category: "life"},
    {text: "Never give up, because winners dont.", category: "motivation"},
    {text: "Orare et Laborare.", category: "inspirational"},
];
function showRandomQuote() {
    const randoIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randoIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `${quote.text} - ${quote.category}`;
}
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText !== "" && newQuoteCategory !== "") {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        alert("Quote added successfully!");
        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";
    } else {
        alert("Please enter both a quote and a category.");
    }
}
function createAddQuoteForm() {
    const formContainer = document.createElement('div');

    const newQuoteTextInput = document.createElement('input');
    newQuoteTextInput.id = 'newQuoteText';
    newQuoteTextInput.type = 'text';
    newQuoteTextInput.placeholder = 'Enter a new quote';

    const newQuoteCategoryInput = document.createElement('input');
    newQuoteCategoryInput.id = 'newQuoteCategory';
    newQuoteCategoryInput.type = 'text';
    newQuoteCategoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;

    formContainer.appendChild(newQuoteTextInput);
    formContainer.appendChild(newQuoteCategoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Show a random quote when the page loads
window.onload = showRandomQuote;
