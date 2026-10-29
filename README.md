# Book Library

Starter files for recap project 1. The three HTML pages and the stylesheet are ready: `index.html` lists the books, `detail.html` shows a single book, and `favorite.html` shows the favorites. The sample rows and the sample book show what the pages look like with data. Your TypeScript replaces them with data from `bookmonkey-api`.

Put your TypeScript files into a `src` folder and compile them into `dist`.


## Tech Stack
HTML5: Page structure (index.html, detail.html, favorite.html)
CSS3: Styling via style.css
TypeScript: Logic and type safety; source code in src/, compiled to dist/
bookmonkey-api: REST API serving as the data source for the books
Git & GitHub: Version control, feature branches, and pull requests

# TypeScript Project Setup

## 1. Initialize npm

Creates a `package.json` file to manage project metadata and dependencies.

```bash
npm init -y
```

## 2. Install TypeScript

Installs TypeScript as a development dependency and updates `package.json` and `package-lock.json`.

```bash
npm install --save-dev typescript
```

## 3. Verify the TypeScript installation

Checks the installed TypeScript compiler version.

```bash
npx tsc --version
```

## 4. Initialize TypeScript configuration

Creates a `tsconfig.json` file to configure the TypeScript compiler.

```bash
npx tsc --init
```

## 5. Install project dependencies (if needed)

Installs all dependencies listed in `package.json`. This step is usually unnecessary immediately after step 2 because npm has already installed TypeScript.

```bash
npm install
```

## Summary

Run these commands in order:

```bash
npm init -y
npm install --save-dev typescript
npx tsc --version
npx tsc --init
```

**Result:** Your project has a `package.json`, TypeScript installed as a development dependency, and a `tsconfig.json` configuration file.

### REST API

The book data is provided by the `bookmonkey-api` package. Start the API in its own terminal and keep it running while you develop the application.

```bash
npx bookmonkey-api@4
```

#### API Details

- **Base URL:** `http://localhost:4730`
- **`GET /books`** — Returns all books.
- **`GET /books/{isbn}`** — Returns a single book identified by its ISBN.
- **API Documentation:** [http://localhost:4730/api](http://localhost:4730/api)

Use the interactive API documentation to explore all available endpoints and inspect the fields returned for each book. Use this information to define the appropriate TypeScript types for your application.

#### Important

Keep the API server running in a separate terminal while developing and testing your application.

<br>

### TASK 01 - Script Tags

Add a `<script type="module">` tag to each HTML page to load its corresponding compiled JavaScript entry file from the `dist` directory.

**`index.html`**
```html
<script type="module" src="./dist/index.js"></script>
```

**`detail.html`**
```html
<script type="module" src="./dist/detail.js"></script>
```

**`favorite.html`**
```html
<script type="module" src="./dist/favorite.js"></script>
```

#### Important

- Place each script tag near the end of its HTML page, just before `</body>`.
- The `dist` directory contains the JavaScript files compiled from your TypeScript source files.
- The `type="module"` attribute enables JavaScript module imports and exports.
- Make sure your `tsconfig.json` compiles the entry files into `dist` and preserves the expected directory structure.
- Run npx `tsc --watch` and a local web server, for example npx http-server -c-1, next to the API

<br>

### TASK 01 - Development Environment

Run the TypeScript compiler, a local web server, and the Bookmonkey API in **three separate terminal tabs**. Keep all three processes running while developing.

#### Terminal 1: Bookmonkey API

Starts the REST API at `http://localhost:4730`.

```bash
npx bookmonkey-api@4
```

#### Terminal 2: TypeScript Watch Mode

Compiles your TypeScript files automatically whenever you save changes.

```bash
npx tsc --watch
```

The compiler reads your `tsconfig.json` configuration and generates JavaScript files in the `dist` directory.

#### Terminal 3: Local Web Server

Serves your HTML pages and compiled JavaScript files.

```bash
npx http-server -c-1
```

The `-c-1` option disables caching, helping the browser load the latest files during development.

Open the local URL printed by `http-server` in your browser to test the application.

**Development workflow:**

1. Start the API.
2. Start TypeScript watch mode.
3. Start the local web server.
4. Edit your `.ts` files and save changes.
5. TypeScript recompiles automatically; refresh the browser to see the changes.


<br>

### TASK 02 - Book Listing
- check index.html for list
- add an id <tbody id="book-list">
- <h2 id="book-count">0 Books displayed</h2>