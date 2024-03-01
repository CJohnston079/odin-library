const books = [];
const libraryMainElement = document.getElementById("library");

function addBookToLibrary(newBook) {
	if (books.some(book => book.title == newBook.title)) {
		return;
	}
	books.push(newBook);
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

export { books, addBookToLibrary, removeBookFromLibrary, clearLibrary, sortItems, loadItems };
