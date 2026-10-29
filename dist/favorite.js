// src/favorite.ts
console.log("Favorite Page loaded");
import { fetchBooks } from "./books.js";
const FAVORITES_KEY = "favoriteBooks";
const favoritesList = document.querySelector("#favorites-list");
const favoritesHeading = document.querySelector("#favorites-heading");
const searchInput = document.querySelector("#search");
const publisherFilter = document.querySelector("#by-publisher");
const favoritesCount = document.querySelector(".mainnav-number");
export function getFavorites() {
    try {
        const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
        if (Array.isArray(data) &&
            data.every((isbn) => typeof isbn === "string")) {
            return data;
        }
        return [];
    }
    catch {
        return [];
    }
}
export function isFavorite(book) {
    return getFavorites().includes(book.isbn);
}
export function toggleFavorite(book) {
    const favorites = getFavorites();
    const alreadyFavorite = favorites.includes(book.isbn);
    const updatedFavorites = alreadyFavorite
        ? favorites.filter((isbn) => isbn !== book.isbn)
        : [...favorites, book.isbn];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return !alreadyFavorite;
}
// ISBN JSON PARSE 
export function getFavoriteIsbns() {
    try {
        const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
        if (Array.isArray(stored) &&
            stored.every((isbn) => typeof isbn === "string")) {
            return stored;
        }
        return [];
    }
    catch {
        return [];
    }
}
let favoriteBooks = [];
// UPDATE
export function updateCount(count) {
    if (favoritesHeading) {
        favoritesHeading.textContent =
            `${count} Favorite${count === 1 ? "" : "s"} on your list`;
    }
    if (favoritesCount) {
        favoritesCount.textContent = String(count);
    }
}
// RENDER
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
    // NOTHING IN LIST
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
    filteredBooks.forEach((book) => {
        const row = document.createElement("tr");
        // Remove favorite button
        const favoriteCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.className = "button button-clear fav-btn";
        removeButton.type = "button";
        removeButton.setAttribute("aria-label", `Remove ${book.title} from favorites`);
        removeButton.textContent = "×";
        removeButton.addEventListener("click", () => {
            const updatedIsbns = getFavoriteIsbns().filter((isbn) => isbn !== book.isbn);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedIsbns));
            favoriteBooks = favoriteBooks.filter((favorite) => favorite.isbn !== book.isbn);
            updateCount(favoriteBooks.length);
            renderFavorites();
        });
        favoriteCell.append(removeButton);
        // Book information
        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        const isbnCell = document.createElement("td");
        isbnCell.textContent = book.isbn;
        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        const publisherCell = document.createElement("td");
        publisherCell.textContent = book.publisher;
        // Detail link
        const detailCell = document.createElement("td");
        const detailLink = document.createElement("a");
        detailLink.href = `detail.html?isbn=${encodeURIComponent(book.isbn)}`;
        detailLink.className = "button";
        detailLink.textContent = "Detail";
        detailCell.append(detailLink);
        row.append(favoriteCell, titleCell, isbnCell, authorCell, publisherCell, detailCell);
        favoritesList.append(row);
    });
}
// INITIALISE
async function initFavorites() {
    if (!favoritesList) {
        console.error("Favorites table body not found.");
        return;
    }
    try {
        const books = await fetchBooks();
        const favoriteIsbns = getFavoriteIsbns();
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
        cell.textContent = "Could not load books. Please try again.";
        row.append(cell);
        favoritesList.append(row);
    }
}
searchInput?.addEventListener("input", renderFavorites);
publisherFilter?.addEventListener("change", renderFavorites);
// Prevent the search and filter forms from reloading the page.
document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
});
initFavorites();
//# sourceMappingURL=favorite.js.map