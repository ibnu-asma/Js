
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

// Get quotes from API
// let apiQuotes = [];

// Show New Quote
 function newQuote() {
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    if(!quote.author)
    {
        authorText.textContent = 'Unknown';
    }

    else{
        authorText.textContent = quote.author;
    }

    // Check quote length to determine styling

    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    
    quoteText.textContent = quote.text;
 }
// async function getQuotes() {
//     const apiUrl = 'https://type.fit/api/quotes';

//     try {
//         const response = await fetch(apiUrl);
//         apiQuotes = await response.json();
//         newQuote();

//     } catch(error) {
//             //Catch Error Here
//     }
// }
function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}


newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
newQuote();

