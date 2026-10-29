"use strict";
// A Book interface with the fields you need, 
// and a type guard isBook
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBook = isBook;
// type guard with typeof
function isBook(value) {
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