
import type { Book } from "./types.js";

console.log("Detail Page loaded");

const bookDetail = document.querySelector<HTMLElement>("#book-detail");
const detailError = document.querySelector<HTMLParagraphElement>("#detail-error");

// ASYNC INIT 
async function initDetail(): Promise<void> {

// Query-Parameter: ?isbn=…
// Beispiel: /detail.html?isbn=9780747532699

  const params = new URLSearchParams(window.location.search);
  const isbn = params.get("isbn");
  console.log("ISBN from URL:", isbn);


// Pfadparameter: /books/:isbn
// Beispiel: /books/9780747532699
// Passt gut zu REST-APIs und dynamischen Routen.
// const pathParts = window.location.pathname.split("/");
// const isbn = pathParts[2];


// ERROR ISBN
  if (!isbn) {
    showError("No ISBN was provided in the URL.");
    return;
  }

// API ISBN ROUTE
  try {
    const response = await fetch(
      `http://localhost:4730/books/${encodeURIComponent(isbn)}`
    );

// MESSAGE 404 - NOT FOUND
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`No book found with ISBN: ${isbn}`);
        }
     throw new Error(`API error: ${response.status}`);
    }


// JSON RESPONSE
    const book: Book = await response.json();

    // if (!bookDetail) return;
    if (!bookDetail) {
         showError("Book detail container not found in HTML.");
    return;
    }

   // BOOK TITLE
    const heading = document.createElement("h1");
    heading.textContent = book.title;

    // BOOK ISBN
    const isbnText = document.createElement("p");
    isbnText.textContent = `ISBN: ${book.isbn}`;

    // BOOK AUTHOR
    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    // BOOK PUBLISHER
    const publisher = document.createElement("p");
    publisher.textContent = `Publisher: ${book.publisher}`;

    // RENDER BOOK DETAILS
    bookDetail.replaceChildren(
        heading,
        isbnText,
        author,
        publisher
    );

  } catch (error: unknown) {
  console.error("Could not load book details:", error);

  if (error instanceof Error) {
    showError(error.message);
  } else {
    showError("An unexpected error occurred.");
  }
}}

// EMPTY PAGE
function showError(message: string): void {
  if (!bookDetail) {
    showError("Book detail container not found in HTML.");
    return;
    }
}

initDetail();
