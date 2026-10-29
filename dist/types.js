// A Book interface with the fields you need, 
// and a type guard isBook
// type guard with typeof
export function isBook(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const book = value;
    return (typeof book.title === "string" &&
        typeof book.isbn === "string" &&
        typeof book.author === "string" &&
        typeof book.publisher === "string");
}
//# sourceMappingURL=types.js.map