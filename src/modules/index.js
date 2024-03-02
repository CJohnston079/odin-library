import Book from "./book.js";
import defaultBooks from "./defaultBooks";
import { books, addBookToLibrary, removeBookFromLibrary, sortItems, loadItems } from "./library.js";

defaultBooks.forEach(addBookToLibrary);

sortItems(books, "title");
loadItems(books);

const dialog = document.querySelector("dialog");
const newBookForm = document.querySelector("#new-book");
const showButton = document.querySelector("#add-new-book");
const closeButton = document.querySelector("#close-dialog");
const cancelButton = document.querySelector("#cancel-new-item");
const submitButton = document.querySelector("#submit-button");

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

function removeCard(event) {
	const cardToRemove = event.target.closest(".card");
	const bookTitle = cardToRemove.querySelector("h3").textContent;

	if (cardToRemove) {
		removeBookFromLibrary(bookTitle);
		cardToRemove.remove();
	}
}

showButton.addEventListener("mousedown", () => dialog.showModal());
submitButton.addEventListener("mousedown", () => {
	const title = newBookForm.elements.title.value;
	const author = newBookForm.elements.author.value;
	const isRead = newBookForm.elements["book-completion"].value === "true" ? true : false;

	addBookToLibrary(new Book(title, author, isRead));
	sortItems(books, "title");
	loadItems(books);
});
closeButton.addEventListener("mousedown", () => dialog.close());
cancelButton.addEventListener("mousedown", () => dialog.close());

const removeButtons = document.querySelectorAll(".card button:nth-of-type(2)");
const isReadButtons = document.querySelectorAll(".card button:nth-of-type(1)");

removeButtons.forEach(button => {
	button.addEventListener("mousedown", removeCard);
});

isReadButtons.forEach(button => {
	button.addEventListener("mousedown", toggleIsReadButton);
});
