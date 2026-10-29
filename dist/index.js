console.log("Index Page loaded");
// DATA FETCH
import { fetchBooks } from "./books.js";
// SEARCH //lib DOM selectors 
const bookSearch = document.querySelector("#search");
const publisherFilter = document.querySelector("#by-publisher");
const bookList = document.querySelector("#book-list");
const bookCount = document.querySelector("#book-count");
const errorMessage = document.querySelector("#error-message");
// create a new ARRAY of filtered Books from Interface
// books fetched from the API.
let allBooks = [];
// < ------------------------->
// ASYNC fetch them all before render
async function init() {
    try {
        allBooks = await fetchBooks();
        console.log("All books:", allBooks.length);
        populatePublishers(allBooks);
        renderBooks();
    }
    catch (error) {
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
    }
    init();
    // < ------------------------->
    // DYNAMIC BOOK LIST UPDATE empty
    // function definition renderBooks ()
    // event listener detects typing and calls
    export function renderBooks() {
        console.log("Search value:", bookSearch?.value);
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
            // 3. Define Publisher match
            const matchesPublisher = selectedPublisher === "-" || book.publisher === selectedPublisher;
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
    function populatePublishers(books) {
        if (!publisherFilter)
            return;
        const publishers = [
            ...new Set(books.map((book) => book.publisher)),
        ].sort();
        publisherFilter.replaceChildren(new Option("All publishers", "-"));
        publishers.forEach((publisher) => {
            publisherFilter.add(new Option(publisher, publisher));
        });
    }
    // OUTSIDE event Listener
    bookSearch?.addEventListener("input", renderBooks);
    publisherFilter?.addEventListener("change", renderBooks);
}
//# sourceMappingURL=index.js.map