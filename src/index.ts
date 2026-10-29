console.log("Index Page loaded")

// DATA FETCH
import { fetchBooks } from "./books.js";

// BOOK TYPE INTERFACE
import type { Book } from "./types.js";
import { isFavorite, toggleFavorite } from "./favorite.js";
import { getFavorites } from "./favorite.js";


// 2. SELECT HTML ELEMENTS
// SEARCH //lib DOM selectors 
const bookSearch = document.querySelector<HTMLInputElement>("#search");
const publisherFilter = document.querySelector<HTMLSelectElement>("#by-publisher");
const bookList =document.querySelector<HTMLTableSectionElement>("#book-list");
const bookCount =document.querySelector<HTMLHeadingElement>("#book-count");

const errorMessage = document.querySelector<HTMLParagraphElement>("#error-message");

// create a new ARRAY of filtered Books from Interface
// books fetched from the API.
let allBooks: Book[] = [];


// 3. CREATE FAVORITE BUTTON — PUT IT HERE
function createFavoriteButton(book: Book): HTMLButtonElement {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "button button-clear fav-btn";

  function updateButton(): void {
    const favorite = isFavorite(book);

    button.textContent = favorite ? "♥" : "♡";
    button.setAttribute(
      "aria-label",
      favorite
        ? `Remove ${book.title} from favorites`
        : `Add ${book.title} to favorites`
    );
    button.setAttribute("aria-pressed", String(favorite));
  }

  button.addEventListener("click", () => {
    toggleFavorite(book);
    updateButton();
  });

  updateButton();

  return button;
}

// < ------------------------->
// ASYNC fetch them all before render
async function init(): Promise<void> {
  try {
    allBooks = await fetchBooks();
    console.log("All books:", allBooks.length);

    populatePublishers(allBooks);
    renderBooks();

  } catch (error: unknown) {
  console.error("Could not load books:", error);

  console.log("Error element found:", errorMessage);

  if (errorMessage) {
    errorMessage.textContent =
      "Unable to load books. Please check your connection and try again.";

    errorMessage.hidden = false;
  }

  bookList?.replaceChildren();

  if (bookCount) {
    bookCount.textContent = "Books could not be loaded";
  }
}}

init();
// < ------------------------->

// DYNAMIC BOOK LIST UPDATE empty
// function definition renderBooks ()
// event listener detects typing and calls
function renderBooks(): void {
    console.log("Search value:", bookSearch?.value);

  if (!bookList || !bookCount) {
  console.error("Missing HTML element:", {
        bookList,
        bookCount,
    });
    return;
    }

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

console.log("Filtered books:", filteredBooks.length, filteredBooks);
console.log("Table body found:", bookList);
bookCount.textContent = `${filteredBooks.length} Books displayed`;

// < ------------------------->
// render BOOKS in the HTML LIST
bookList.replaceChildren();

    filteredBooks.forEach((book) => {
    const row = document.createElement("tr");

     // FAVORITE BUTTON
    const favoriteCell = document.createElement("td");
    favoriteCell.append(createFavoriteButton(book));

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;

    const isbnCell = document.createElement("td");

    // Create titleCell, isbnCell, authorCell, publisherCell here.
    const detailCell = document.createElement("td");
    const detailLink = document.createElement("a");
        detailLink.href = `detail.html?isbn=${encodeURIComponent(book.isbn)}`;
        detailLink.textContent = "Detail";
        detailLink.classList.add("button");

        detailCell.append(detailLink);

    isbnCell.textContent = book.isbn;

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;

    const publisherCell = document.createElement("td");
    publisherCell.textContent = book.publisher;

    row.append(
        favoriteCell,
        titleCell, 
        isbnCell, 
        authorCell, 
        publisherCell,
        detailCell
    );

    bookList.append(row);
 });
}
// < ------------------------->
// DYNAMIC PUBLISHER DROPDOWN
function populatePublishers(books: Book[]): void {
    if (!publisherFilter) return;

    const publishers = [
        ...new Set(books.map((book) => book.publisher)),].sort();

    publisherFilter.replaceChildren(
        new Option("All publishers", "-")
    );

    publishers.forEach((publisher) => {
        publisherFilter.add(new Option(publisher, publisher));
    });
}

// < ------------------------->
// FAVOURITE COUNT HEART
const favoriteCount = document.querySelector<HTMLElement>("#favorite-count");

function updateFavoriteCount(): void {
  if (favoriteCount) {
    favoriteCount.textContent = String(getFavorites().length);
  }
}

updateFavoriteCount();


// OUTSIDE event Listener
bookSearch?.addEventListener("input", renderBooks);
publisherFilter?.addEventListener("change", renderBooks);