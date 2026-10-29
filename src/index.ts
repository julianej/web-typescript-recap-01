console.log("Index Page loaded")

import { fetchBooks } from "./books.js";

// DYNAMIC BOOK LIST UPDATE
try {
 // fetch
  const books = await fetchBooks();
  console.log("Books fetched:", books);

  // Update heading
  const bookCount =
    document.querySelector<HTMLHeadingElement>("#book-count");

  if (bookCount) {
    bookCount.textContent = `${books.length} Books displayed`;
  }
} catch (error: unknown) {
  console.error("Could not load books:", error);
}
