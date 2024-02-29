(self["webpackChunkodin_library"] = self["webpackChunkodin_library"] || []).push([["index"],{

/***/ "./src/modules/index.js":
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/modules/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixVQUFVO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNELFVBQVU7QUFDaEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tbGlicmFyeS8uL3NyYy9tb2R1bGVzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvb2tzID0gW107XG5jb25zdCBsaWJyYXJ5TWFpbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpYnJhcnlcIik7XG5cbmNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaWFsb2dcIik7XG5jb25zdCBuZXdCb29rRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LWJvb2tcIik7XG5jb25zdCBzaG93QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtbmV3LWJvb2tcIik7XG5jb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtZGlhbG9nXCIpO1xuY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW5jZWwtbmV3LWl0ZW1cIik7XG5jb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdC1idXR0b25cIik7XG5cbnNob3dCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiBkaWFsb2cuc2hvd01vZGFsKCkpO1xuXG5zdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiB7XG5cdGNvbnN0IHRpdGxlID0gbmV3Qm9va0Zvcm0uZWxlbWVudHMudGl0bGUudmFsdWU7XG5cdGNvbnN0IGF1dGhvciA9IG5ld0Jvb2tGb3JtLmVsZW1lbnRzLmF1dGhvci52YWx1ZTtcblx0Y29uc3QgcGFnZXMgPSBuZXdCb29rRm9ybS5lbGVtZW50cy5wYWdlcy52YWx1ZTtcblx0Y29uc3QgaXNSZWFkID0gbmV3Qm9va0Zvcm0uZWxlbWVudHNbXCJib29rLWNvbXBsZXRpb25cIl0udmFsdWUgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlO1xuXG5cdGFkZEJvb2tUb0xpYnJhcnkobmV3IEJvb2sodGl0bGUsIGF1dGhvciwgcGFnZXMsIGlzUmVhZCkpO1xuXHRzb3J0SXRlbXMoYm9va3MsIFwidGl0bGVcIik7XG5cdGxvYWRJdGVtcyhib29rcyk7XG59KTtcblxuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiBkaWFsb2cuY2xvc2UoKSk7XG5jYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiBkaWFsb2cuY2xvc2UoKSk7XG5cbmNsYXNzIEJvb2sge1xuXHRjb25zdHJ1Y3Rvcih0aXRsZSwgYXV0aG9yLCBpc1JlYWQgPSBmYWxzZSkge1xuXHRcdHRoaXMudGl0bGUgPSB0aXRsZTtcblx0XHR0aGlzLmF1dGhvciA9IGF1dGhvcjtcblx0XHR0aGlzLmNvdmVyU3JjID0gZ2V0Q292ZXJJbWFnZSh0aXRsZSwgXCJib29rXCIpO1xuXHRcdHRoaXMuaXNSZWFkID0gaXNSZWFkO1xuXHR9XG5cblx0dG9nZ2xlSXNSZWFkKCkge1xuXHRcdHRoaXMuaXNSZWFkID0gIXRoaXMuaXNSZWFkO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldENvdmVySW1hZ2UodGl0bGUsIG1lZGlhVHlwZSkge1xuXHRsZXQgY292ZXJJbWFnZVBhdGggPVxuXHRcdGAuL2Fzc2V0cy9pbWFnZXMvJHttZWRpYVR5cGV9cy9gICtcblx0XHR0aXRsZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2VBbGwoXCIgXCIsIFwiLVwiKS5yZXBsYWNlQWxsKFwiJ1wiLCBcIlwiKSArXG5cdFx0XCIuanBnXCI7XG5cdGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cdHhoci5vcGVuKFwiSEVBRFwiLCBjb3ZlckltYWdlUGF0aCwgZmFsc2UpO1xuXHR4aHIuc2VuZCgpO1xuXG5cdGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcblx0XHRjb3ZlckltYWdlUGF0aCA9IGAuL2Fzc2V0cy9pbWFnZXMvZGVmYXVsdC9kZWZhdWx0LSR7bWVkaWFUeXBlfS5qcGdgO1xuXHR9XG5cdHJldHVybiBjb3ZlckltYWdlUGF0aDtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlSXNSZWFkQnV0dG9uKGV2ZW50KSB7XG5cdGNvbnN0IGlzUmVhZEJ1dHRvbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmNhcmRcIikucXVlcnlTZWxlY3RvcihcImJ1dHRvbjpudGgtb2YtdHlwZSgxKVwiKTtcblx0Y29uc3QgYm9va1RpdGxlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuY2FyZFwiKS5xdWVyeVNlbGVjdG9yKFwiaDNcIikudGV4dENvbnRlbnQ7XG5cdGNvbnN0IGJvb2sgPSBib29rcy5maW5kKGJvb2sgPT4gKGJvb2sudGl0bGUgPSBib29rVGl0bGUpKTtcblxuXHRpc1JlYWRCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImlzLXJlYWRcIik7XG5cdGlzUmVhZEJ1dHRvbi50ZXh0Q29udGVudCA9PT0gXCJSZWFkXCJcblx0XHQ/IChpc1JlYWRCdXR0b24udGV4dENvbnRlbnQgPSBcIlVucmVhZFwiKVxuXHRcdDogKGlzUmVhZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVhZFwiKTtcblxuXHRib29rLnRvZ2dsZUlzUmVhZCgpO1xufVxuXG5mdW5jdGlvbiBhZGRCb29rVG9MaWJyYXJ5KG5ld0Jvb2spIHtcblx0aWYgKGJvb2tzLnNvbWUoYm9vayA9PiBib29rLnRpdGxlID09IG5ld0Jvb2sudGl0bGUpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGJvb2tzLnB1c2gobmV3Qm9vayk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNhcmQoZXZlbnQpIHtcblx0Y29uc3QgY2FyZFRvUmVtb3ZlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuY2FyZFwiKTtcblx0Y29uc3QgYm9va1RpdGxlID0gY2FyZFRvUmVtb3ZlLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKS50ZXh0Q29udGVudDtcblxuXHRpZiAoY2FyZFRvUmVtb3ZlKSB7XG5cdFx0cmVtb3ZlQm9va0Zyb21MaWJyYXJ5KGJvb2tUaXRsZSk7XG5cdFx0Y2FyZFRvUmVtb3ZlLnJlbW92ZSgpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUJvb2tGcm9tTGlicmFyeShib29rVGl0bGUpIHtcblx0Y29uc3QgcmVtb3ZhbEluZGV4ID0gYm9va3MuZmluZEluZGV4KGJvb2sgPT4gYm9vay50aXRsZSA9PT0gYm9va1RpdGxlKTtcblx0Ym9va3Muc3BsaWNlKHJlbW92YWxJbmRleCwgMSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyTGlicmFyeSgpIHtcblx0d2hpbGUgKGxpYnJhcnlNYWluRWxlbWVudC5sYXN0Q2hpbGQpIHtcblx0XHRsaWJyYXJ5TWFpbkVsZW1lbnQucmVtb3ZlQ2hpbGQobGlicmFyeU1haW5FbGVtZW50LmZpcnN0Q2hpbGQpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNvcnRJdGVtcyhpdGVtcywgc29ydFBhcmFtKSB7XG5cdGl0ZW1zLnNvcnQoKGEsIGIpID0+IHtcblx0XHRjb25zdCBpdGVtQSA9IGFbc29ydFBhcmFtXS50b0xvd2VyQ2FzZSgpO1xuXHRcdGNvbnN0IGl0ZW1CID0gYltzb3J0UGFyYW1dLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRyZXR1cm4gaXRlbUEgPCBpdGVtQiA/IC0xIDogaXRlbUEgPiBpdGVtQiA/IDEgOiAwO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gbG9hZEl0ZW1zKGJvb2tzKSB7XG5cdGNsZWFyTGlicmFyeSgpO1xuXHRib29rcy5mb3JFYWNoKGJvb2sgPT4ge1xuXHRcdGNvbnN0IGJvb2tDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRjb25zdCBib29rQ292ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdGNvbnN0IGJvb2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcblx0XHRjb25zdCBib29rQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0Y29uc3QgaXNSZWFkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG5cdFx0Ym9va0NhcmQuY2xhc3NMaXN0LmFkZChcImNhcmRcIik7XG5cdFx0Ym9va0NvdmVyLnNyYyA9IGJvb2suY292ZXJTcmM7XG5cdFx0Ym9va0NvdmVyLmFsdCA9IGJvb2sudGl0bGUgKyBcIiBib29rIGNvdmVyXCI7XG5cdFx0Ym9va1RpdGxlLnRleHRDb250ZW50ID0gYm9vay50aXRsZTtcblx0XHRib29rQXV0aG9yLnRleHRDb250ZW50ID0gYm9vay5hdXRob3I7XG5cdFx0aXNSZWFkQnV0dG9uLnRleHRDb250ZW50ID0gXCJVbnJlYWRcIjtcblx0XHRkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiO1xuXG5cdFx0aWYgKGJvb2suaXNSZWFkKSB7XG5cdFx0XHRpc1JlYWRCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlYWRcIjtcblx0XHRcdGlzUmVhZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaXMtcmVhZFwiKTtcblx0XHR9XG5cblx0XHRib29rQ2FyZC5hcHBlbmRDaGlsZChib29rQ292ZXIpO1xuXHRcdGJvb2tDYXJkLmFwcGVuZENoaWxkKGlzUmVhZEJ1dHRvbik7XG5cdFx0Ym9va0NhcmQuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcblx0XHRib29rQ2FyZC5hcHBlbmRDaGlsZChib29rVGl0bGUpO1xuXHRcdGJvb2tDYXJkLmFwcGVuZENoaWxkKGJvb2tBdXRob3IpO1xuXG5cdFx0bGlicmFyeU1haW5FbGVtZW50LmFwcGVuZENoaWxkKGJvb2tDYXJkKTtcblx0fSk7XG59XG5cbmNvbnN0IGRlZmF1bHRCb29rcyA9IFtcblx0bmV3IEJvb2soXCJUaGUgSG9iYml0XCIsIFwiSi4gUi4gUi4gVG9sa2llblwiLCAoaXNSZWFkID0gdHJ1ZSkpLFxuXHRuZXcgQm9vayhcIlRoZSBMb3JkIG9mIHRoZSBSaW5nc1wiLCBcIkouIFIuIFIuIFRvbGtpZW5cIiwgKGlzUmVhZCA9IHRydWUpKSxcblx0bmV3IEJvb2soXCJUaGUgU2lsbWFyaWxsaW9uXCIsIFwiSi4gUi4gUi4gVG9sa2llblwiLCAoaXNSZWFkID0gdHJ1ZSkpLFxuXHRuZXcgQm9vayhcIk1pZGRsZW1hcmNoXCIsIFwiR2VvcmdlIEVsaW90XCIpLFxuXHRuZXcgQm9vayhcIjE5ODRcIiwgXCJHZW9yZ2UgT3J3ZWxsXCIsIChpc1JlYWQgPSB0cnVlKSksXG5cdG5ldyBCb29rKFwiQW5pbWFsIEZhcm1cIiwgXCJHZW9yZ2UgT3J3ZWxsXCIsIChpc1JlYWQgPSB0cnVlKSksXG5cdG5ldyBCb29rKFwiRnJhbmtlbnN0ZWluXCIsIFwiTWFyeSBTaGVsbGV5XCIpLFxuXHRuZXcgQm9vayhcIkphbmUgRXlyZVwiLCBcIkNoYXJsb3R0ZSBCcm9udGVcIiksXG5cdG5ldyBCb29rKFwiVG8gdGhlIExpZ2h0aG91c2VcIiwgXCJWaXJnaW5pYSBXb29sZlwiKSxcblx0bmV3IEJvb2soXCJXdXRoZXJpbmcgSGVpZ2h0c1wiLCBcIkVtaWx5IEJyb250ZVwiKSxcblx0bmV3IEJvb2soXCJMb3JkIG9mIHRoZSBGbGllc1wiLCBcIldpbGxpYW0gR29sZGluZ1wiLCAoaXNSZWFkID0gdHJ1ZSkpLFxuXHRuZXcgQm9vayhcIlRocm91Z2ggdGhlIExvb2tpbmcgR2xhc3NcIiwgXCJMZXdpcyBDYXJyb2xsXCIpLFxuXHRuZXcgQm9vayhcIkFsaWNlIGluIFdvbmRlcmxhbmRcIiwgXCJMZXdpcyBDYXJyb2xsXCIsIChpc1JlYWQgPSB0cnVlKSksXG5cdG5ldyBCb29rKFwiUHJpZGUgYW5kIFByZWp1ZGljZVwiLCBcIkphbmUgQXVzdGVuXCIpLFxuXHRuZXcgQm9vayhcIlRoZSBXaW5kIGluIHRoZSBXaWxsb3dzXCIsIFwiS2VubmV0aCBHcmFoYW1lXCIsIChpc1JlYWQgPSB0cnVlKSksXG5cdG5ldyBCb29rKFwiVGhlIExpb24sIHRoZSBXaXRjaCBhbmQgdGhlIFdhcmRyb2JlXCIsIFwiQy5TLiBMZXdpc1wiLCAoaXNSZWFkID0gdHJ1ZSkpLFxuXHRuZXcgQm9vayhcIlRoZSBIb3JzZSBhbmQgaGlzIEJveVwiLCBcIkMuUy4gTGV3aXNcIiksXG5cdG5ldyBCb29rKFwiVGhlIE1hZ2ljaWFuJ3MgTmVwaGV3XCIsIFwiQy5TLiBMZXdpc1wiKSxcblx0bmV3IEJvb2soXCJWb3lhZ2Ugb2YgdGhlIERhd24gVHJlYWRlclwiLCBcIkMuUy4gTGV3aXNcIiksXG5cdG5ldyBCb29rKFwiQSBDbG9ja3dvcmsgT3JhbmdlXCIsIFwiQW50aG9ueSBCdXJnZXNzXCIpLFxuXHRuZXcgQm9vayhcIlByaW5jZSBDYXNwaWFuXCIsIFwiQy5TLiBMZXdpc1wiKSxcblx0bmV3IEJvb2soXCJUaGUgTGFzdCBCYXR0bGVcIiwgXCJDLlMuIExld2lzXCIpLFxuXHRuZXcgQm9vayhcIlRoZSBTaWx2ZXIgQ2hhaXJcIiwgXCJDLlMuIExld2lzXCIpLFxuXHRuZXcgQm9vayhcIkdyZWF0IEV4cGVjdGF0aW9uc1wiLCBcIkNoYXJsZXMgRGlja2Vuc1wiKSxcblx0bmV3IEJvb2soXCJXb2xmIEhhbGxcIiwgXCJIaWxhcnkgTWFudGVsXCIpLFxuXHRuZXcgQm9vayhcIkJyaW5nIFVwIFRoZSBCb2RpZXNcIiwgXCJIaWxhcnkgTWFudGVsXCIpLFxuXHRuZXcgQm9vayhcIlRoZSBNaXJyb3IgYW5kIHRoZSBMaWdodFwiLCBcIkhpbGFyeSBNYW50ZWxcIiksXG5cdG5ldyBCb29rKFwiR3VsbGl2ZXIncyBUcmF2ZWxzXCIsIFwiSm9uYXRoYW4gU3dpZnRcIiksXG5cdG5ldyBCb29rKFwiUGVyc3Vhc2lvblwiLCBcIkphbmUgQXVzdGVuXCIpLFxuXHRuZXcgQm9vayhcIlZhbml0eSBGYWlyXCIsIFwiV2lsbGlhbSBNYWtlcGVhY2UgVGhhY2tlcmF5XCIpLFxuXHRuZXcgQm9vayhcIkVtbWFcIiwgXCJKYW5lIEF1c3RlblwiKSxcblx0bmV3IEJvb2soXCJSb2JpbnNvbiBDcnVzb2VcIiwgXCJEYW5pZWwgRGVmb2VcIiksXG5cdG5ldyBCb29rKFwiVGhlIFJlbWFpbnMgb2YgdGhlIERheVwiLCBcIkthenVvIElzaGlndXJvXCIpLFxuXHRuZXcgQm9vayhcIlNlbnNlIGFuZCBTZW5zaWJpbGl0eVwiLCBcIkphbmUgQXVzdGVuXCIpLFxuXHRuZXcgQm9vayhcIlZpbGxldHRlXCIsIFwiQ2hhcmxvdHRlIEJyb250ZVwiKSxcblx0bmV3IEJvb2soXCJNcnMgRGFsbG93YXlcIiwgXCJWaXJnaW5pYSBXb29sZlwiKSxcblx0bmV3IEJvb2soXCJUaGUgRW5kIG9mIHRoZSBBZmZhaXJcIiwgXCJHcmFoYW0gR3JlZW5lXCIpLFxuXHRuZXcgQm9vayhcIlRoZSBXb21hbiBpbiBXaGl0ZVwiLCBcIldpbGtpZSBDb2xsaW5zXCIpLFxuXHRuZXcgQm9vayhcIkJsZWFrIEhvdXNlXCIsIFwiQ2hhcmxlcyBEaWNrZW5zXCIpLFxuXHRuZXcgQm9vayhcIlBvc3Nlc3Npb25cIiwgXCJBLiBTLiBCeWF0dFwiKSxcbl07XG5cbmRlZmF1bHRCb29rcy5mb3JFYWNoKGFkZEJvb2tUb0xpYnJhcnkpO1xuXG5zb3J0SXRlbXMoYm9va3MsIFwidGl0bGVcIik7XG5sb2FkSXRlbXMoYm9va3MpO1xuXG5jb25zdCByZW1vdmVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJkIGJ1dHRvbjpudGgtb2YtdHlwZSgyKVwiKTtcbmNvbnN0IGlzUmVhZEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmQgYnV0dG9uOm50aC1vZi10eXBlKDEpXCIpO1xuXG5yZW1vdmVCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcmVtb3ZlQ2FyZCk7XG59KTtcblxuaXNSZWFkQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRvZ2dsZUlzUmVhZEJ1dHRvbik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==