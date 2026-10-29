"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Index Page loaded");
const books_js_1 = require("./books.js");
// DYNAMIC BOOK LIST UPDATE
try {
    // fetch
    const books = await (0, books_js_1.fetchBooks)();
    console.log("Books fetched:", books);
    // Update heading
    const bookCount = document.querySelector("#book-count");
    if (bookCount) {
        bookCount.textContent = `${books.length} Books displayed`;
    }
}
catch (error) {
    console.error("Could not load books:", error);
}
//# sourceMappingURL=index.js.map