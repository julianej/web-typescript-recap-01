// src/favorite.ts
console.log("Favorite Page loaded");
import { fetchBooks } from "./books.js";
const FAVORITES_KEY = "favoriteBooks";
// SELECT HTML ELEMENTS
const favoritesList = document.querySelector("#favorites-list");
const favoritesHeading = document.querySelector("#favorites-heading");
const searchInput = document.querySelector("#search");
const publisherFilter = document.querySelector("#by-publisher");
const favoritesCount = document.querySelector(".mainnav-number");
// TYPE GUARD
function isStringArray(value) {
    return (Array.isArray(value) &&
        value.every((isbn) => typeof isbn === "string"));
}
// READ FAVORITES FROM LOCAL STORAGE
export function getFavorites() {
    try {
        const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
        return isStringArray(stored) ? stored : [];
    }
    catch {
        return [];
    }
}
// CHECK IF BOOK IS FAVORITE
export function isFavorite(book) {
    return getFavorites().includes(book.isbn);
}
// ADD OR REMOVE FAVORITE
export function toggleFavorite(book) {
    const favorites = getFavorites();
    const alreadyFavorite = favorites.includes(book.isbn);
    const updatedFavorites = alreadyFavorite
        ? favorites.filter((isbn) => isbn !== book.isbn)
        : [...favorites, book.isbn];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return !alreadyFavorite;
}
// STORE FAVORITE BOOKS
let favoriteBooks = [];
// UPDATE FAVORITE COUNT
export function updateCount(count) {
    if (favoritesHeading) {
        favoritesHeading.textContent =
            `${count} Favorite${count === 1 ? "" : "s"} on your list`;
    }
    if (favoritesCount) {
        favoritesCount.textContent = String(count);
    }
}
// RENDER FAVORITES
export function renderFavorites() {
    if (!favoritesList)
        return;
    const searchTerm = searchInput?.value.trim().toLowerCase() ?? "";
    const selectedPublisher = publisherFilter?.value ?? "-";
    const filteredBooks = favoriteBooks.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.isbn.toLowerCase().includes(searchTerm);
        const matchesPublisher = selectedPublisher === "-" ||
            book.publisher === selectedPublisher;
        return matchesSearch && matchesPublisher;
    });
    favoritesList.replaceChildren();
    // EMPTY FAVORITES OR NO SEARCH RESULTS
    if (filteredBooks.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 6;
        cell.textContent =
            favoriteBooks.length === 0
                ? "You haven't added any favorites yet."
                : "No favorites match your search.";
        row.append(cell);
        favoritesList.append(row);
        return;
    }
    // CREATE BOOK ROWS
    filteredBooks.forEach((book) => {
        const row = document.createElement("tr");
        // REMOVE FAVORITE BUTTON
        const favoriteCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.className = "button button-clear fav-btn";
        removeButton.type = "button";
        removeButton.setAttribute("aria-label", `Remove ${book.title} from favorites`);
        removeButton.textContent = "×";
        removeButton.addEventListener("click", () => {
            const updatedFavorites = getFavorites().filter((isbn) => isbn !== book.isbn);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
            favoriteBooks = favoriteBooks.filter((favorite) => favorite.isbn !== book.isbn);
            updateCount(favoriteBooks.length);
            renderFavorites();
        });
        favoriteCell.append(removeButton);
        // BOOK TITLE
        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        // ISBN
        const isbnCell = document.createElement("td");
        isbnCell.textContent = book.isbn;
        // AUTHOR
        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        // PUBLISHER
        const publisherCell = document.createElement("td");
        publisherCell.textContent = book.publisher;
        // DETAIL LINK
        const detailCell = document.createElement("td");
        const detailLink = document.createElement("a");
        detailLink.href =
            `detail.html?isbn=${encodeURIComponent(book.isbn)}`;
        detailLink.className = "button";
        detailLink.textContent = "Detail";
        detailCell.append(detailLink);
        // APPEND CELLS
        row.append(favoriteCell, titleCell, isbnCell, authorCell, publisherCell, detailCell);
        favoritesList.append(row);
    });
}
// INITIALIZE FAVORITES PAGE
async function initFavorites() {
    if (!favoritesList) {
        console.error("Favorites table body not found.");
        return;
    }
    try {
        const books = await fetchBooks();
        const favoriteIsbns = getFavorites();
        favoriteBooks = books.filter((book) => favoriteIsbns.includes(book.isbn));
        updateCount(favoriteBooks.length);
        renderFavorites();
    }
    catch (error) {
        console.error("Failed to load favorites:", error);
        favoritesList.replaceChildren();
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 6;
        cell.textContent =
            "Could not load books. Please try again.";
        row.append(cell);
        favoritesList.append(row);
    }
}
// SEARCH AND FILTER EVENTS
searchInput?.addEventListener("input", renderFavorites);
publisherFilter?.addEventListener("change", renderFavorites);
// PREVENT FORM RELOAD
document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
});
// START
initFavorites();
//# sourceMappingURL=favorite.js.map