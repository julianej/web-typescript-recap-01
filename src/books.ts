import { isBook, type Book } from "./types.js";

const data: unknown = {
  title: "Example Book",
  isbn: "1234567890",
  author: "Jane Doe",
  publisher: "Example Publishing",
};

if (isBook(data)) {
  const book: Book = data;
  console.log(book.title);
}
// BOOK LISTING
// fetch BOOKS API 
const API_URL = "http://localhost:4730";

// A function fetchBooks(): Promise<Book[]> 
export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books`);
// that checks response.ok 
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid API response: expected an array of books");
  }
// and returns only valid books
  return data.filter(isBook);
}