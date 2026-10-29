console.log("Index Page loaded")

// DATA FETCH
import { fetchBooks } from "./books.js";

// BOOK TYPE INTERFACE
import type { Book } from "./types.js";

// SEARCH //lib DOM selectors 
const bookSearch = document.querySelector<HTMLInputElement>("#search");
const publisherFilter = document.querySelector<HTMLSelectElement>("#by-publisher");
const bookList =document.querySelector<HTMLTableSectionElement>("#book-list");
const bookCount =document.querySelector<HTMLHeadingElement>("#book-count");

// create a new ARRAY of filtered Books from Interface
// books fetched from the API.
let allBooks: Book[] = [];

// < ------------------------->
// ASYN fetch them all before render
async function init(): Promise<void> {
  try {
    allBooks = await fetchBooks();
    console.log("All books:", allBooks.length);

    // populatePublishers(allBooks);
    renderBooks();

  } catch (error: unknown) {
    console.error("Could not load books:", error);
  }
}

init();
// < ------------------------->

// DYNAMIC BOOK LIST UPDATE empty
// function definition renderBooks ()
// event listener detects typing and calls
export function renderBooks(): void {
    console.log("Search value:", bookSearch?.value);

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

    // 3. Define Publisher match
    const matchesPublisher =
      selectedPublisher === "-" || book.publisher === selectedPublisher;

    return matchesSearch && matchesPublisher;
});

bookCount.textContent = `${filteredBooks.length} Books displayed`;

// < ------------------------->
// render BOOKS in the HTML LIST
bookList.replaceChildren();

    filteredBooks.forEach((book) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;

    const isbnCell = document.createElement("td");
    isbnCell.textContent = book.isbn;

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;

    const publisherCell = document.createElement("td");
    publisherCell.textContent = book.publisher;

    row.append(titleCell, isbnCell, authorCell, publisherCell);

    bookList.append(row);
    });
}
// < ------------------------->
// DYNAMIC PUBLISHER DROPDOWN
// < ------------------------->

// OUTSIDE event Listener
bookSearch?.addEventListener("input", renderBooks);
publisherFilter?.addEventListener("change", renderBooks);