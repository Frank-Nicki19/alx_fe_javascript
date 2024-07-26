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

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Show a random quote when the page loads
window.onload = showRandomQuote;
