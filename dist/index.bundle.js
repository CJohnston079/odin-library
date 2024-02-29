(self["webpackChunkodin_library"] = self["webpackChunkodin_library"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

const books = [];
const libraryMainElement = document.getElementById("library");

const dialog = document.querySelector("dialog");
const newBookForm = document.querySelector("#new-book");
const showButton = document.querySelector("#add-new-book");
const closeButton = document.querySelector("#close-dialog");
const cancelButton = document.querySelector("#cancel-new-item");
const submitButton = document.querySelector("#submit-button");

showButton.addEventListener("mousedown", () => dialog.showModal());

submitButton.addEventListener("mousedown", () => {
	const title = newBookForm.elements.title.value;
	const author = newBookForm.elements.author.value;
	const pages = newBookForm.elements.pages.value;
	const isRead = newBookForm.elements["book-completion"].value === "true" ? true : false;

	addBookToLibrary(new Book(title, author, pages, isRead));
	sortItems(books, "title");
	loadItems(books);
});

closeButton.addEventListener("mousedown", () => dialog.close());
cancelButton.addEventListener("mousedown", () => dialog.close());

class Book {
	constructor(title, author, isRead = false) {
		this.title = title;
		this.author = author;
		this.coverSrc = getCoverImage(title, "book");
		this.isRead = isRead;
	}

	toggleIsRead() {
		this.isRead = !this.isRead;
	}
}

function getCoverImage(title, mediaType) {
	let coverImagePath =
		`./assets/images/${mediaType}s/` +
		title.toLowerCase().replaceAll(" ", "-").replaceAll("'", "") +
		".jpg";
	const xhr = new XMLHttpRequest();

	xhr.open("HEAD", coverImagePath, false);
	xhr.send();

	if (xhr.status !== 200) {
		coverImagePath = `./assets/images/default/default-${mediaType}.jpg`;
	}
	return coverImagePath;
}

function toggleIsReadButton(event) {
	const isReadButton = event.target.closest(".card").querySelector("button:nth-of-type(1)");
	const bookTitle = event.target.closest(".card").querySelector("h3").textContent;
	const book = books.find(book => (book.title = bookTitle));

	isReadButton.classList.toggle("is-read");
	isReadButton.textContent === "Read"
		? (isReadButton.textContent = "Unread")
		: (isReadButton.textContent = "Read");

	book.toggleIsRead();
}

function addBookToLibrary(newBook) {
	if (books.some(book => book.title == newBook.title)) {
		return;
	}
	books.push(newBook);
}

function removeCard(event) {
	const cardToRemove = event.target.closest(".card");
	const bookTitle = cardToRemove.querySelector("h3").textContent;

	if (cardToRemove) {
		removeBookFromLibrary(bookTitle);
		cardToRemove.remove();
	}
}

function removeBookFromLibrary(bookTitle) {
	const removalIndex = books.findIndex(book => book.title === bookTitle);
	books.splice(removalIndex, 1);
}

function clearLibrary() {
	while (libraryMainElement.lastChild) {
		libraryMainElement.removeChild(libraryMainElement.firstChild);
	}
}

function sortItems(items, sortParam) {
	items.sort((a, b) => {
		const itemA = a[sortParam].toLowerCase();
		const itemB = b[sortParam].toLowerCase();

		return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
	});
}

function loadItems(books) {
	clearLibrary();
	books.forEach(book => {
		const bookCard = document.createElement("div");
		const bookCover = document.createElement("img");
		const bookTitle = document.createElement("h3");
		const bookAuthor = document.createElement("p");
		const isReadButton = document.createElement("button");
		const deleteButton = document.createElement("button");

		bookCard.classList.add("card");
		bookCover.src = book.coverSrc;
		bookCover.alt = book.title + " book cover";
		bookTitle.textContent = book.title;
		bookAuthor.textContent = book.author;
		isReadButton.textContent = "Unread";
		deleteButton.textContent = "Remove";

		if (book.isRead) {
			isReadButton.textContent = "Read";
			isReadButton.classList.add("is-read");
		}

		bookCard.appendChild(bookCover);
		bookCard.appendChild(isReadButton);
		bookCard.appendChild(deleteButton);
		bookCard.appendChild(bookTitle);
		bookCard.appendChild(bookAuthor);

		libraryMainElement.appendChild(bookCard);
	});
}

const defaultBooks = [
	new Book("The Hobbit", "J. R. R. Tolkien", (isRead = true)),
	new Book("The Lord of the Rings", "J. R. R. Tolkien", (isRead = true)),
	new Book("The Silmarillion", "J. R. R. Tolkien", (isRead = true)),
	new Book("Middlemarch", "George Eliot"),
	new Book("1984", "George Orwell", (isRead = true)),
	new Book("Animal Farm", "George Orwell", (isRead = true)),
	new Book("Frankenstein", "Mary Shelley"),
	new Book("Jane Eyre", "Charlotte Bronte"),
	new Book("To the Lighthouse", "Virginia Woolf"),
	new Book("Wuthering Heights", "Emily Bronte"),
	new Book("Lord of the Flies", "William Golding", (isRead = true)),
	new Book("Through the Looking Glass", "Lewis Carroll"),
	new Book("Alice in Wonderland", "Lewis Carroll", (isRead = true)),
	new Book("Pride and Prejudice", "Jane Austen"),
	new Book("The Wind in the Willows", "Kenneth Grahame", (isRead = true)),
	new Book("The Lion, the Witch and the Wardrobe", "C.S. Lewis", (isRead = true)),
	new Book("The Horse and his Boy", "C.S. Lewis"),
	new Book("The Magician's Nephew", "C.S. Lewis"),
	new Book("Voyage of the Dawn Treader", "C.S. Lewis"),
	new Book("A Clockwork Orange", "Anthony Burgess"),
	new Book("Prince Caspian", "C.S. Lewis"),
	new Book("The Last Battle", "C.S. Lewis"),
	new Book("The Silver Chair", "C.S. Lewis"),
	new Book("Great Expectations", "Charles Dickens"),
	new Book("Wolf Hall", "Hilary Mantel"),
	new Book("Bring Up The Bodies", "Hilary Mantel"),
	new Book("The Mirror and the Light", "Hilary Mantel"),
	new Book("Gulliver's Travels", "Jonathan Swift"),
	new Book("Persuasion", "Jane Austen"),
	new Book("Vanity Fair", "William Makepeace Thackeray"),
	new Book("Emma", "Jane Austen"),
	new Book("Robinson Crusoe", "Daniel Defoe"),
	new Book("The Remains of the Day", "Kazuo Ishiguro"),
	new Book("Sense and Sensibility", "Jane Austen"),
	new Book("Villette", "Charlotte Bronte"),
	new Book("Mrs Dalloway", "Virginia Woolf"),
	new Book("The End of the Affair", "Graham Greene"),
	new Book("The Woman in White", "Wilkie Collins"),
	new Book("Bleak House", "Charles Dickens"),
	new Book("Possession", "A. S. Byatt"),
];

defaultBooks.forEach(addBookToLibrary);

sortItems(books, "title");
loadItems(books);

const removeButtons = document.querySelectorAll(".card button:nth-of-type(2)");
const isReadButtons = document.querySelectorAll(".card button:nth-of-type(1)");

removeButtons.forEach(button => {
	button.addEventListener("mousedown", removeCard);
});

isReadButtons.forEach(button => {
	button.addEventListener("mousedown", toggleIsReadButton);
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixVQUFVO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNELFVBQVU7QUFDaEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tbGlicmFyeS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBib29rcyA9IFtdO1xuY29uc3QgbGlicmFyeU1haW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaWJyYXJ5XCIpO1xuXG5jb25zdCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGlhbG9nXCIpO1xuY29uc3QgbmV3Qm9va0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1ib29rXCIpO1xuY29uc3Qgc2hvd0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLW5ldy1ib29rXCIpO1xuY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLWRpYWxvZ1wiKTtcbmNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FuY2VsLW5ldy1pdGVtXCIpO1xuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXQtYnV0dG9uXCIpO1xuXG5zaG93QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKCkgPT4gZGlhbG9nLnNob3dNb2RhbCgpKTtcblxuc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKCkgPT4ge1xuXHRjb25zdCB0aXRsZSA9IG5ld0Jvb2tGb3JtLmVsZW1lbnRzLnRpdGxlLnZhbHVlO1xuXHRjb25zdCBhdXRob3IgPSBuZXdCb29rRm9ybS5lbGVtZW50cy5hdXRob3IudmFsdWU7XG5cdGNvbnN0IHBhZ2VzID0gbmV3Qm9va0Zvcm0uZWxlbWVudHMucGFnZXMudmFsdWU7XG5cdGNvbnN0IGlzUmVhZCA9IG5ld0Jvb2tGb3JtLmVsZW1lbnRzW1wiYm9vay1jb21wbGV0aW9uXCJdLnZhbHVlID09PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZTtcblxuXHRhZGRCb29rVG9MaWJyYXJ5KG5ldyBCb29rKHRpdGxlLCBhdXRob3IsIHBhZ2VzLCBpc1JlYWQpKTtcblx0c29ydEl0ZW1zKGJvb2tzLCBcInRpdGxlXCIpO1xuXHRsb2FkSXRlbXMoYm9va3MpO1xufSk7XG5cbmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKCkgPT4gZGlhbG9nLmNsb3NlKCkpO1xuY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKCkgPT4gZGlhbG9nLmNsb3NlKCkpO1xuXG5jbGFzcyBCb29rIHtcblx0Y29uc3RydWN0b3IodGl0bGUsIGF1dGhvciwgaXNSZWFkID0gZmFsc2UpIHtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5hdXRob3IgPSBhdXRob3I7XG5cdFx0dGhpcy5jb3ZlclNyYyA9IGdldENvdmVySW1hZ2UodGl0bGUsIFwiYm9va1wiKTtcblx0XHR0aGlzLmlzUmVhZCA9IGlzUmVhZDtcblx0fVxuXG5cdHRvZ2dsZUlzUmVhZCgpIHtcblx0XHR0aGlzLmlzUmVhZCA9ICF0aGlzLmlzUmVhZDtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRDb3ZlckltYWdlKHRpdGxlLCBtZWRpYVR5cGUpIHtcblx0bGV0IGNvdmVySW1hZ2VQYXRoID1cblx0XHRgLi9hc3NldHMvaW1hZ2VzLyR7bWVkaWFUeXBlfXMvYCArXG5cdFx0dGl0bGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlQWxsKFwiIFwiLCBcIi1cIikucmVwbGFjZUFsbChcIidcIiwgXCJcIikgK1xuXHRcdFwiLmpwZ1wiO1xuXHRjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHR4aHIub3BlbihcIkhFQURcIiwgY292ZXJJbWFnZVBhdGgsIGZhbHNlKTtcblx0eGhyLnNlbmQoKTtcblxuXHRpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0Y292ZXJJbWFnZVBhdGggPSBgLi9hc3NldHMvaW1hZ2VzL2RlZmF1bHQvZGVmYXVsdC0ke21lZGlhVHlwZX0uanBnYDtcblx0fVxuXHRyZXR1cm4gY292ZXJJbWFnZVBhdGg7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUlzUmVhZEJ1dHRvbihldmVudCkge1xuXHRjb25zdCBpc1JlYWRCdXR0b24gPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5jYXJkXCIpLnF1ZXJ5U2VsZWN0b3IoXCJidXR0b246bnRoLW9mLXR5cGUoMSlcIik7XG5cdGNvbnN0IGJvb2tUaXRsZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmNhcmRcIikucXVlcnlTZWxlY3RvcihcImgzXCIpLnRleHRDb250ZW50O1xuXHRjb25zdCBib29rID0gYm9va3MuZmluZChib29rID0+IChib29rLnRpdGxlID0gYm9va1RpdGxlKSk7XG5cblx0aXNSZWFkQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1yZWFkXCIpO1xuXHRpc1JlYWRCdXR0b24udGV4dENvbnRlbnQgPT09IFwiUmVhZFwiXG5cdFx0PyAoaXNSZWFkQnV0dG9uLnRleHRDb250ZW50ID0gXCJVbnJlYWRcIilcblx0XHQ6IChpc1JlYWRCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlYWRcIik7XG5cblx0Ym9vay50b2dnbGVJc1JlYWQoKTtcbn1cblxuZnVuY3Rpb24gYWRkQm9va1RvTGlicmFyeShuZXdCb29rKSB7XG5cdGlmIChib29rcy5zb21lKGJvb2sgPT4gYm9vay50aXRsZSA9PSBuZXdCb29rLnRpdGxlKSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRib29rcy5wdXNoKG5ld0Jvb2spO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDYXJkKGV2ZW50KSB7XG5cdGNvbnN0IGNhcmRUb1JlbW92ZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmNhcmRcIik7XG5cdGNvbnN0IGJvb2tUaXRsZSA9IGNhcmRUb1JlbW92ZS5xdWVyeVNlbGVjdG9yKFwiaDNcIikudGV4dENvbnRlbnQ7XG5cblx0aWYgKGNhcmRUb1JlbW92ZSkge1xuXHRcdHJlbW92ZUJvb2tGcm9tTGlicmFyeShib29rVGl0bGUpO1xuXHRcdGNhcmRUb1JlbW92ZS5yZW1vdmUoKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVCb29rRnJvbUxpYnJhcnkoYm9va1RpdGxlKSB7XG5cdGNvbnN0IHJlbW92YWxJbmRleCA9IGJvb2tzLmZpbmRJbmRleChib29rID0+IGJvb2sudGl0bGUgPT09IGJvb2tUaXRsZSk7XG5cdGJvb2tzLnNwbGljZShyZW1vdmFsSW5kZXgsIDEpO1xufVxuXG5mdW5jdGlvbiBjbGVhckxpYnJhcnkoKSB7XG5cdHdoaWxlIChsaWJyYXJ5TWFpbkVsZW1lbnQubGFzdENoaWxkKSB7XG5cdFx0bGlicmFyeU1haW5FbGVtZW50LnJlbW92ZUNoaWxkKGxpYnJhcnlNYWluRWxlbWVudC5maXJzdENoaWxkKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzb3J0SXRlbXMoaXRlbXMsIHNvcnRQYXJhbSkge1xuXHRpdGVtcy5zb3J0KChhLCBiKSA9PiB7XG5cdFx0Y29uc3QgaXRlbUEgPSBhW3NvcnRQYXJhbV0udG9Mb3dlckNhc2UoKTtcblx0XHRjb25zdCBpdGVtQiA9IGJbc29ydFBhcmFtXS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0cmV0dXJuIGl0ZW1BIDwgaXRlbUIgPyAtMSA6IGl0ZW1BID4gaXRlbUIgPyAxIDogMDtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRJdGVtcyhib29rcykge1xuXHRjbGVhckxpYnJhcnkoKTtcblx0Ym9va3MuZm9yRWFjaChib29rID0+IHtcblx0XHRjb25zdCBib29rQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0Y29uc3QgYm9va0NvdmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblx0XHRjb25zdCBib29rVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG5cdFx0Y29uc3QgYm9va0F1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdGNvbnN0IGlzUmVhZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0Y29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuXHRcdGJvb2tDYXJkLmNsYXNzTGlzdC5hZGQoXCJjYXJkXCIpO1xuXHRcdGJvb2tDb3Zlci5zcmMgPSBib29rLmNvdmVyU3JjO1xuXHRcdGJvb2tDb3Zlci5hbHQgPSBib29rLnRpdGxlICsgXCIgYm9vayBjb3ZlclwiO1xuXHRcdGJvb2tUaXRsZS50ZXh0Q29udGVudCA9IGJvb2sudGl0bGU7XG5cdFx0Ym9va0F1dGhvci50ZXh0Q29udGVudCA9IGJvb2suYXV0aG9yO1xuXHRcdGlzUmVhZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiVW5yZWFkXCI7XG5cdFx0ZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJSZW1vdmVcIjtcblxuXHRcdGlmIChib29rLmlzUmVhZCkge1xuXHRcdFx0aXNSZWFkQnV0dG9uLnRleHRDb250ZW50ID0gXCJSZWFkXCI7XG5cdFx0XHRpc1JlYWRCdXR0b24uY2xhc3NMaXN0LmFkZChcImlzLXJlYWRcIik7XG5cdFx0fVxuXG5cdFx0Ym9va0NhcmQuYXBwZW5kQ2hpbGQoYm9va0NvdmVyKTtcblx0XHRib29rQ2FyZC5hcHBlbmRDaGlsZChpc1JlYWRCdXR0b24pO1xuXHRcdGJvb2tDYXJkLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cdFx0Ym9va0NhcmQuYXBwZW5kQ2hpbGQoYm9va1RpdGxlKTtcblx0XHRib29rQ2FyZC5hcHBlbmRDaGlsZChib29rQXV0aG9yKTtcblxuXHRcdGxpYnJhcnlNYWluRWxlbWVudC5hcHBlbmRDaGlsZChib29rQ2FyZCk7XG5cdH0pO1xufVxuXG5jb25zdCBkZWZhdWx0Qm9va3MgPSBbXG5cdG5ldyBCb29rKFwiVGhlIEhvYmJpdFwiLCBcIkouIFIuIFIuIFRvbGtpZW5cIiwgKGlzUmVhZCA9IHRydWUpKSxcblx0bmV3IEJvb2soXCJUaGUgTG9yZCBvZiB0aGUgUmluZ3NcIiwgXCJKLiBSLiBSLiBUb2xraWVuXCIsIChpc1JlYWQgPSB0cnVlKSksXG5cdG5ldyBCb29rKFwiVGhlIFNpbG1hcmlsbGlvblwiLCBcIkouIFIuIFIuIFRvbGtpZW5cIiwgKGlzUmVhZCA9IHRydWUpKSxcblx0bmV3IEJvb2soXCJNaWRkbGVtYXJjaFwiLCBcIkdlb3JnZSBFbGlvdFwiKSxcblx0bmV3IEJvb2soXCIxOTg0XCIsIFwiR2VvcmdlIE9yd2VsbFwiLCAoaXNSZWFkID0gdHJ1ZSkpLFxuXHRuZXcgQm9vayhcIkFuaW1hbCBGYXJtXCIsIFwiR2VvcmdlIE9yd2VsbFwiLCAoaXNSZWFkID0gdHJ1ZSkpLFxuXHRuZXcgQm9vayhcIkZyYW5rZW5zdGVpblwiLCBcIk1hcnkgU2hlbGxleVwiKSxcblx0bmV3IEJvb2soXCJKYW5lIEV5cmVcIiwgXCJDaGFybG90dGUgQnJvbnRlXCIpLFxuXHRuZXcgQm9vayhcIlRvIHRoZSBMaWdodGhvdXNlXCIsIFwiVmlyZ2luaWEgV29vbGZcIiksXG5cdG5ldyBCb29rKFwiV3V0aGVyaW5nIEhlaWdodHNcIiwgXCJFbWlseSBCcm9udGVcIiksXG5cdG5ldyBCb29rKFwiTG9yZCBvZiB0aGUgRmxpZXNcIiwgXCJXaWxsaWFtIEdvbGRpbmdcIiwgKGlzUmVhZCA9IHRydWUpKSxcblx0bmV3IEJvb2soXCJUaHJvdWdoIHRoZSBMb29raW5nIEdsYXNzXCIsIFwiTGV3aXMgQ2Fycm9sbFwiKSxcblx0bmV3IEJvb2soXCJBbGljZSBpbiBXb25kZXJsYW5kXCIsIFwiTGV3aXMgQ2Fycm9sbFwiLCAoaXNSZWFkID0gdHJ1ZSkpLFxuXHRuZXcgQm9vayhcIlByaWRlIGFuZCBQcmVqdWRpY2VcIiwgXCJKYW5lIEF1c3RlblwiKSxcblx0bmV3IEJvb2soXCJUaGUgV2luZCBpbiB0aGUgV2lsbG93c1wiLCBcIktlbm5ldGggR3JhaGFtZVwiLCAoaXNSZWFkID0gdHJ1ZSkpLFxuXHRuZXcgQm9vayhcIlRoZSBMaW9uLCB0aGUgV2l0Y2ggYW5kIHRoZSBXYXJkcm9iZVwiLCBcIkMuUy4gTGV3aXNcIiwgKGlzUmVhZCA9IHRydWUpKSxcblx0bmV3IEJvb2soXCJUaGUgSG9yc2UgYW5kIGhpcyBCb3lcIiwgXCJDLlMuIExld2lzXCIpLFxuXHRuZXcgQm9vayhcIlRoZSBNYWdpY2lhbidzIE5lcGhld1wiLCBcIkMuUy4gTGV3aXNcIiksXG5cdG5ldyBCb29rKFwiVm95YWdlIG9mIHRoZSBEYXduIFRyZWFkZXJcIiwgXCJDLlMuIExld2lzXCIpLFxuXHRuZXcgQm9vayhcIkEgQ2xvY2t3b3JrIE9yYW5nZVwiLCBcIkFudGhvbnkgQnVyZ2Vzc1wiKSxcblx0bmV3IEJvb2soXCJQcmluY2UgQ2FzcGlhblwiLCBcIkMuUy4gTGV3aXNcIiksXG5cdG5ldyBCb29rKFwiVGhlIExhc3QgQmF0dGxlXCIsIFwiQy5TLiBMZXdpc1wiKSxcblx0bmV3IEJvb2soXCJUaGUgU2lsdmVyIENoYWlyXCIsIFwiQy5TLiBMZXdpc1wiKSxcblx0bmV3IEJvb2soXCJHcmVhdCBFeHBlY3RhdGlvbnNcIiwgXCJDaGFybGVzIERpY2tlbnNcIiksXG5cdG5ldyBCb29rKFwiV29sZiBIYWxsXCIsIFwiSGlsYXJ5IE1hbnRlbFwiKSxcblx0bmV3IEJvb2soXCJCcmluZyBVcCBUaGUgQm9kaWVzXCIsIFwiSGlsYXJ5IE1hbnRlbFwiKSxcblx0bmV3IEJvb2soXCJUaGUgTWlycm9yIGFuZCB0aGUgTGlnaHRcIiwgXCJIaWxhcnkgTWFudGVsXCIpLFxuXHRuZXcgQm9vayhcIkd1bGxpdmVyJ3MgVHJhdmVsc1wiLCBcIkpvbmF0aGFuIFN3aWZ0XCIpLFxuXHRuZXcgQm9vayhcIlBlcnN1YXNpb25cIiwgXCJKYW5lIEF1c3RlblwiKSxcblx0bmV3IEJvb2soXCJWYW5pdHkgRmFpclwiLCBcIldpbGxpYW0gTWFrZXBlYWNlIFRoYWNrZXJheVwiKSxcblx0bmV3IEJvb2soXCJFbW1hXCIsIFwiSmFuZSBBdXN0ZW5cIiksXG5cdG5ldyBCb29rKFwiUm9iaW5zb24gQ3J1c29lXCIsIFwiRGFuaWVsIERlZm9lXCIpLFxuXHRuZXcgQm9vayhcIlRoZSBSZW1haW5zIG9mIHRoZSBEYXlcIiwgXCJLYXp1byBJc2hpZ3Vyb1wiKSxcblx0bmV3IEJvb2soXCJTZW5zZSBhbmQgU2Vuc2liaWxpdHlcIiwgXCJKYW5lIEF1c3RlblwiKSxcblx0bmV3IEJvb2soXCJWaWxsZXR0ZVwiLCBcIkNoYXJsb3R0ZSBCcm9udGVcIiksXG5cdG5ldyBCb29rKFwiTXJzIERhbGxvd2F5XCIsIFwiVmlyZ2luaWEgV29vbGZcIiksXG5cdG5ldyBCb29rKFwiVGhlIEVuZCBvZiB0aGUgQWZmYWlyXCIsIFwiR3JhaGFtIEdyZWVuZVwiKSxcblx0bmV3IEJvb2soXCJUaGUgV29tYW4gaW4gV2hpdGVcIiwgXCJXaWxraWUgQ29sbGluc1wiKSxcblx0bmV3IEJvb2soXCJCbGVhayBIb3VzZVwiLCBcIkNoYXJsZXMgRGlja2Vuc1wiKSxcblx0bmV3IEJvb2soXCJQb3NzZXNzaW9uXCIsIFwiQS4gUy4gQnlhdHRcIiksXG5dO1xuXG5kZWZhdWx0Qm9va3MuZm9yRWFjaChhZGRCb29rVG9MaWJyYXJ5KTtcblxuc29ydEl0ZW1zKGJvb2tzLCBcInRpdGxlXCIpO1xubG9hZEl0ZW1zKGJvb2tzKTtcblxuY29uc3QgcmVtb3ZlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2FyZCBidXR0b246bnRoLW9mLXR5cGUoMilcIik7XG5jb25zdCBpc1JlYWRCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJkIGJ1dHRvbjpudGgtb2YtdHlwZSgxKVwiKTtcblxucmVtb3ZlQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHJlbW92ZUNhcmQpO1xufSk7XG5cbmlzUmVhZEJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0b2dnbGVJc1JlYWRCdXR0b24pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=