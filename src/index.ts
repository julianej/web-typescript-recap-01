console.log("Index Page loaded")

import { fetchBooks } from "./books.js";

// BOOK TYPE INTERFACE
import type { Book } from "./types.js";

// SEARCH //lib DOM selectors 
const bookSearch = document.querySelector<HTMLInputElement>("#search");
const publisherFilter = document.querySelector<HTMLSelectElement>("#by-publisher");
const bookList =document.querySelector<HTMLTableSectionElement>("#book-list");
const bookCount =document.querySelector<HTMLHeadingElement>("#book-count");

// create a new ARRAY of filtered Books from Interface
let allBooks: Book[] = [];

// DYNAMIC BOOK LIST UPDATE empty
function renderBooks(): void {
  if (!bookList || !bookCount) return;

    // 1. Get the current filter values
    const searchTerm = bookSearch?.value.trim().toLowerCase() ?? "";
    const selectedPublisher = publisherFilter?.value ?? "-";

    // 2. Define filteredBooks match
    const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm) ||
      book.isbn.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.publisher.toLowerCase().includes(searchTerm);

    const matchesPublisher =
      selectedPublisher === "-" || book.publisher === selectedPublisher;

    return matchesSearch && matchesPublisher;
  });

    bookCount.textContent = `${filteredBooks.length} Books displayed`;
}
