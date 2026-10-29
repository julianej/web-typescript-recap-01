# Book Library

Starter files for recap project 1. The three HTML pages and the stylesheet are ready: `index.html` lists the books, `detail.html` shows a single book, and `favorite.html` shows the favorites. The sample rows and the sample book show what the pages look like with data. Your TypeScript replaces them with data from `bookmonkey-api`.

Put your TypeScript files into a `src` folder and compile them into `dist`.


## Tech Stack
HTML5: Page structure (index.html, detail.html, favorite.html)
CSS3: Styling via style.css
TypeScript: Logic and type safety; source code in src/, compiled to dist/
bookmonkey-api: REST API serving as the data source for the books
Git & GitHub: Version control, feature branches, and pull requests

### Getting Started
01 Clone the repository
02 Run npm init -y  (package.json) listed under devDependencies in your package.json
03 Run npm install --save -dev typescript (adds TypeScript to devDependencies)
04 Run npm install (Installs the required npm packages into node_modules.)
05 Run npx tsc --init (tsconfic.json)
06 Run node dist/index.js to compile to dist/
07 Open index.html in your browser