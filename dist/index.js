"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Index Page loaded");
const books_js_1 = require("./books.js");
// SEARCH //lib DOM selectors 
const bookSearch = document.querySelector("#search");
const publisherFilter = document.querySelector("#by-publisher");
const bookList = document.querySelector("#book-list");
const bookCount = document.querySelector("#book-count");
// create a new ARRAY of filtered Books from Interface
let allBooks = [];
// DYNAMIC BOOK LIST UPDATE empty
function renderBooks() {
    if (!bookList || !bookCount)
        return;
    // 1. Get the current filter values
    const searchTerm = bookSearch?.value.trim().toLowerCase() ?? "";
    const selectedPublisher = publisherFilter?.value ?? "-";
    // 2. Define filteredBooks match
    const filteredBooks = allBooks.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
            book.isbn.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.publisher.toLowerCase().includes(searchTerm);
        const matchesPublisher = selectedPublisher === "-" || book.publisher === selectedPublisher;
        return matchesSearch && matchesPublisher;
    });
    bookCount.textContent = `${filteredBooks.length} Books displayed`;
}
//# sourceMappingURL=index.js.map