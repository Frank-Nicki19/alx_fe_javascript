const quotes = [
  { text: "Life is all about working together.", category: "life" },
  { text: "Never give up, because winners don't.", category: "motivation" },
  { text: "Orare et Laborare.", category: "inspirational" },
];

// Load quotes from local storage if available
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
      quotes.push(...JSON.parse(storedQuotes));
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const serverQuotes = await response.json();
      const formattedQuotes = serverQuotes.map(post => ({ text: post.title, category: 'server' }));
      mergeQuotes(formattedQuotes);
  } catch (error) {
      console.error('Error fetching quotes from server:', error);
  }
}

// Merge quotes from the server with local quotes
function mergeQuotes(serverQuotes) {
  let updated = false;
  serverQuotes.forEach(serverQuote => {
      if (!quotes.some(localQuote => localQuote.text === serverQuote.text && localQuote.category === serverQuote.category)) {
          quotes.push(serverQuote);
          updated = true;
      }
  });
  if (updated) {
      saveQuotes();
      alert('Quotes updated from the server.');
      populateCategories();
      filterQuotes();
  }
}

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = `${quote.text} - ${quote.category}`;
      sessionStorage.setItem('lastQuote', JSON.stringify(quote)); // Save the last viewed quote to session storage
  } else {
      document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
  }
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText !== "" && newQuoteCategory !== "") {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();
      populateCategories(); // Update the categories in the dropdown
      alert("Quote added successfully!");
      document.getElementById('newQuoteText').value = "";
      document.getElementById('newQuoteCategory').value = "";
  } else {
      alert("Please enter both a quote and a category.");
  }
}

// Function to create the form for adding new quotes
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

// Function to export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = url;
  downloadAnchor.download = 'quotes.json';
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories(); // Update the categories in the dropdown
      alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to populate the category filter dropdown
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const quoteDisplay = document.getElementById('quoteDisplay');

  const filteredQuotes = selectedCategory === 'all' 
      ? quotes 
      : quotes.filter(quote => quote.category === selectedCategory);

  if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `${quote.text} - ${quote.category}`;
  } else {
      quoteDisplay.innerHTML = 'No quotes available for this category.';
  }
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);

// Show a random quote and create the add quote form when the page loads
window.onload = () => {
  loadQuotes();
  showRandomQuote();
  createAddQuoteForm();
  populateCategories(); // Populate categories when the page loads

  // Show the last viewed quote from session storage if available
  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
      const quote = JSON.parse(lastQuote);
      document.getElementById('quoteDisplay').innerHTML = `${quote.text} - ${quote.category}`;
  }

  // Load last selected category filter from local storage
  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
      document.getElementById('categoryFilter').value = lastSelectedCategory;
  }
  filterQuotes();
  fetchQuotesFromServer(); // Fetch quotes from the server when the page loads
};

document.getElementById('categoryFilter').addEventListener('change', () => {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);
  filterQuotes();
});

// Periodically fetch quotes from the server
setInterval(fetchQuotesFromServer, 60000); // Fetch every 60 seconds