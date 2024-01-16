const books = []
const libraryMainElement = document.getElementById('library');


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
    const isRead = newBookForm.elements["book-completion"].value === 'true' ? true : false;

    addBookToLibrary(new Book(title, author, pages, isRead));
    sortItems(books, 'title');
    loadItems(books);
});

closeButton.addEventListener("mousedown", () => dialog.close());
cancelButton.addEventListener("mousedown", () => dialog.close());


function Book(title, author, isRead=false) {
    this.title = title;
    this.author = author;
    this.coverSrc = getCoverImage(title, 'book');
    this.isRead = isRead;
}


function getCoverImage(title, mediaType) {
    let coverImagePath = `./images/${mediaType}s/` + title.toLowerCase().replaceAll(' ', '-').replaceAll('\'', '') + '.jpg';
    const xhr = new XMLHttpRequest();

    xhr.open('HEAD', coverImagePath, false);
    xhr.send();

    if (xhr.status !== 200) {
        coverImagePath = `./images/default/default-${mediaType}.jpg`;
    }
    return coverImagePath;
}


function toggleIsRead(book) {
    book.isRead = !book.isRead;
}


function addBookToLibrary(newBook) {
    if (books.some(book => book.title == newBook.title)) {
        return
    }
    books.push(newBook)
}


function removeBookFromLibrary(bookTitle) {
    const removalIndex = books.findIndex(book => book.title === bookTitle);
    books.splice(removalIndex, 1);
}


function clearLibrary() {
    while (libraryMainElement.lastChild) {
        libraryMainElement.removeChild(libraryMainElement.firstChild)
    }
}


function sortItems(items, sortParam) {
    items.sort((a, b) => {
        const itemA = a[sortParam].toLowerCase();
        const itemB = b[sortParam].toLowerCase();

        return itemA < itemB ? -1
        : itemA > itemB ? 1
        : 0;
    });
}


function loadItems(items) {
    clearLibrary()
    items.forEach(item => {
        const bookCard = document.createElement('div')
        const bookCover = document.createElement('img')
        const bookTitle = document.createElement('h3')
        const bookAuthor = document.createElement('p')
        const isReadButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        bookCard.classList.add('card')
        bookCover.src = item.coverSrc;
        bookCover.alt = item.title + ' book cover'
        bookTitle.textContent = item.title;
        bookAuthor.textContent = item.author;
        isReadButton.textContent = 'Unread';
        deleteButton.textContent = 'Remove';

        bookCard.appendChild(bookCover);
        bookCard.appendChild(isReadButton);
        bookCard.appendChild(deleteButton);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);

        libraryMainElement.appendChild(bookCard);
    })
}


const defaultBooks = [
    new Book('The Hobbit', 'J. R. R. Tolkien'),
    new Book('The Lord of the Rings', 'J. R. R. Tolkien'),
    new Book('The Silmarillion', 'J. R. R. Tolkien'),
    new Book('Middlemarch', 'George Eliot'),
    new Book('1984', 'George Orwell'),
    new Book('Animal Farm', 'George Orwell'),
    new Book('Frankenstein', 'Mary Shelley'),
    new Book('Jane Eyre', 'Charlotte Bronte'),
    new Book('To the Lighthouse', 'Virginia Woolf'),
    new Book('Wuthering Heights', 'Emily Bronte'),
    new Book('Lord of the Flies', 'William Golding'),
    new Book('Through the Looking Glass', 'Lewis Carroll'),
    new Book('Alice in Wonderland', 'Lewis Carroll'),
    new Book('Pride and Prejudice', 'Jane Austen'),
    new Book('The Wind in the Willows', 'Kenneth Grahame'),
    new Book('The Lion, the Witch and the Wardrobe', 'C.S. Lewis'),
    new Book('The Horse and his Boy', 'C.S. Lewis'),
    new Book("The Magician's Nephew", 'C.S. Lewis'),
    new Book('Voyage of the Dawn Treader', 'C.S. Lewis'),
    new Book('A Clockwork Orange', 'Anthony Burgess'),
    new Book('Prince Caspian', 'C.S. Lewis'),
    new Book('The Last Battle', 'C.S. Lewis'),
    new Book('The Silver Chair', 'C.S. Lewis'),
    new Book('Great Expectations', 'Charles Dickens'),
    new Book('Wolf Hall', 'Hilary Mantel'),
    new Book('Bring Up The Bodies', 'Hilary Mantel'),
    new Book('The Mirror and the Light', 'Hilary Mantel'),
    new Book("Gulliver's Travels", 'Jonathan Swift'),
    new Book('Persuasion', 'Jane Austen'),
    new Book('Vanity Fair', 'William Makepeace Thackeray'),
    new Book('Emma', 'Jane Austen'),
    new Book('Robinson Crusoe', 'Daniel Defoe'),
    new Book('The Remains of the Day', 'Kazuo Ishiguro'),
    new Book('Sense and Sensibility', 'Jane Austen'),
    new Book('Villette', 'Charlotte Bronte'),
    new Book('Mrs Dalloway', 'Virginia Woolf'),
    new Book('The End of the Affair', 'Graham Greene'),
    new Book('The Woman in White', 'Wilkie Collins'),
    new Book('Bleak House', 'Charles Dickens'),
    new Book('Possession', 'A. S. Byatt')
];


defaultBooks.forEach(addBookToLibrary)


sortItems(books, 'title')
loadItems(books)


const removeButtons = document.querySelectorAll('.card button:nth-of-type(2)');

function removeCard(event) {
    const cardToRemove = event.target.closest('.card');
    const bookTitle = cardToRemove.querySelector('h3').textContent;

    if (cardToRemove) {
        removeBookFromLibrary(bookTitle);
        cardToRemove.remove();
    }
}

removeButtons.forEach(button => {
    button.addEventListener('mousedown', removeCard);
});
