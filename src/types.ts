
// A Book interface with the fields you need, 
// and a type guard isBook

export interface Book {
  isbn: string;
  title: string;
  subtitle?: string;
  abstract?: string;
  author: string;
  publisher: string;
  numPages?: number;
  cover?: string;
}

// type guard with typeof
export function isBook(value: unknown): value is Book {

  if (typeof value !== "object" || value === null) {
    return false;
  }

  const book = value as Record<string, unknown>;

  return (
    typeof book.title === "string" &&
    typeof book.isbn === "string" &&
    typeof book.author === "string" &&
    typeof book.publisher === "string"
  );
}