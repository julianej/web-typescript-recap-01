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
export declare function isBook(value: unknown): value is Book;
//# sourceMappingURL=types.d.ts.map