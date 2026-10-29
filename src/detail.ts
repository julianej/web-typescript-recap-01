
import type { Book } from "./types.js";

console.log("Detail Page loaded");

const bookDetail = document.querySelector<HTMLElement>("#book-detail");
const detailError = document.querySelector<HTMLParagraphElement>("#detail-error");

const backButton = document.querySelector<HTMLButtonElement>("#back-button");

backButton?.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "./index.html";
  }
});

// ASYNC INIT
async function initDetail(): Promise<void> {
  // Read ISBN from query parameter
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
    const response = await fetch(
      `http://localhost:4730/books/${encodeURIComponent(isbn)}`
    );

    // ERROR: API RESPONSE
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`No book found with ISBN: ${isbn}`);
      }

      throw new Error(`API error: ${response.status}`);
    }

    // JSON RESPONSE
    const book: Book = await response.json();

    if (!bookDetail) {
      showError("Book detail container not found in HTML.");
      return;
    }

    // TITLE
    const heading = document.createElement("h1");
    heading.textContent = book.title;

    const elements: HTMLElement[] = [heading];

    // SUBTITLE (OPTIONAL)
    if (book.subtitle) {
      const subtitle = document.createElement("p");
      subtitle.textContent = book.subtitle;
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

      elements.push(abstractHeading, abstract);
    }

    // AUTHOR
    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    elements.push(author);

    // PUBLISHER
    const publisher = document.createElement("p");
    publisher.textContent = `Publisher: ${book.publisher}`;
    elements.push(publisher);

    // NUMBER OF PAGES (OPTIONAL)
    if (book.numPages !== undefined) {
      const pages = document.createElement("p");
      pages.textContent = `Pages: ${book.numPages}`;
      elements.push(pages);
    }

    // ISBN
    const isbnText = document.createElement("p");
    isbnText.textContent = `ISBN: ${book.isbn}`;
    elements.push(isbnText);

    // RENDER ALL BOOK DETAILS
    bookDetail.replaceChildren(...elements);
  } catch (error: unknown) {
    console.error("Could not load book details:", error);

    if (error instanceof Error) {
      showError(error.message);
    } else {
      showError("An unexpected error occurred.");
    }
  }
}

// DISPLAY ERROR MESSAGE
function showError(message: string): void {
  if (!detailError) return;

  detailError.textContent = message;
  detailError.hidden = false;
}

// START
initDetail();
