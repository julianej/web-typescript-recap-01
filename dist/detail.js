console.log("Detail Page loaded");
const bookDetail = document.querySelector("#book-detail");
const detailError = document.querySelector("#detail-error");
const backButton = document.querySelector("#back-button");
// BACK BUTTON
backButton?.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    }
    else {
        window.location.href = "./index.html";
    }
});
// ASYNC INIT
async function initDetail() {
    const params = new URLSearchParams(window.location.search);
    const isbn = params.get("isbn");
    console.log("ISBN from URL:", isbn);
    // ERROR: MISSING ISBN
    if (!isbn) {
        showError("No ISBN was provided in the URL.");
        return;
    }
    try {
        // FETCH BOOK FROM API
        const response = await fetch(`http://localhost:4730/books/${encodeURIComponent(isbn)}`);
        // ERROR: API RESPONSš
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`No book found with ISBN: ${isbn}`);
            }
            throw new Error(`API error: ${response.status}`);
        }
        // JSON RESPONSE
        const book = await response.json();
        if (!bookDetail) {
            showError("Book detail container not found in HTML.");
            return;
        }
        // TITLE
        const heading = document.createElement("h1");
        heading.textContent = book.title;
        const elements = [heading];
        // SUBTITLE (OPTIONAL)
        if (book.subtitle) {
            const subtitle = document.createElement("p");
            subtitle.textContent = book.subtitle;
            subtitle.classList.add("book-subtitle");
            elements.push(subtitle);
        }
        // COVER (OPTIONAL)
        if (book.cover) {
            const cover = document.createElement("img");
            cover.src = book.cover;
            cover.alt = `Cover of ${book.title}`;
            cover.classList.add("book-cover");
            elements.push(cover);
        }
        // ABSTRACT (OPTIONAL)
        if (book.abstract) {
            const abstractHeading = document.createElement("h2");
            abstractHeading.textContent = "Abstract";
            const abstract = document.createElement("p");
            abstract.textContent = book.abstract;
            abstract.classList.add("book-abstract");
            elements.push(abstractHeading, abstract);
        }
        // METADATA
        const metadata = document.createElement("dl");
        metadata.classList.add("book-meta");
        function addMetadata(label, value) {
            const term = document.createElement("dt");
            term.textContent = label;
            const description = document.createElement("dd");
            description.textContent = String(value);
            metadata.append(term, description);
        }
        addMetadata("Author", book.author);
        addMetadata("Publisher", book.publisher);
        // NUMBER OF PAGES (OPTIONAL)
        if (book.numPages !== undefined) {
            addMetadata("Pages", book.numPages);
        }
        addMetadata("ISBN", book.isbn);
        elements.push(metadata);
        // RENDER ALL BOOK DETAILS
        bookDetail.replaceChildren(...elements);
    }
    catch (error) {
        console.error("Could not load book details:", error);
        if (error instanceof Error) {
            showError(error.message);
        }
        else {
            showError("An unexpected error occurred.");
        }
    }
}
// DISPLAY ERROR MESSAGE
function showError(message) {
    if (!detailError)
        return;
    detailError.textContent = message;
    detailError.hidden = false;
}
// START
initDetail();
export {};
//# sourceMappingURL=detail.js.map