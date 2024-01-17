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

Book.prototype.toggleIsRead = function() {
    this.isRead = !this.isRead;
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


function toggleIsReadButton(event) {
    const isReadButton = event.target.closest('.card').querySelector('button:nth-of-type(1)');
    const bookTitle = event.target.closest('.card').querySelector('h3').textContent;
    const book = books.find(book => book.title = bookTitle);

    isReadButton.classList.toggle('is-read');
    isReadButton.textContent === 'Read' ? isReadButton.textContent = 'Unread' : isReadButton.textContent = 'Read' ;
    
    book.toggleIsRead();
}


function addBookToLibrary(newBook) {
    if (books.some(book => book.title == newBook.title)) {
        return
    }
    books.push(newBook)
}


function removeCard(event) {
    const cardToRemove = event.target.closest('.card');
    const bookTitle = cardToRemove.querySelector('h3').textContent;

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


function loadItems(books) {
    clearLibrary()
    books.forEach(book => {
        const bookCard = document.createElement('div')
        const bookCover = document.createElement('img')
        const bookTitle = document.createElement('h3')
        const bookAuthor = document.createElement('p')
        const isReadButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        bookCard.classList.add('card')
        bookCover.src = book.coverSrc;
        bookCover.alt = book.title + ' book cover'
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        isReadButton.textContent = 'Unread';
        deleteButton.textContent = 'Remove';

        if (book.isRead) {
            isReadButton.textContent = 'Read';
            isReadButton.classList.add('is-read')
        }

        bookCard.appendChild(bookCover);
        bookCard.appendChild(isReadButton);
        bookCard.appendChild(deleteButton);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);

        libraryMainElement.appendChild(bookCard);
    })
}


const defaultBooks = [
    new Book('The Hobbit', 'J. R. R. Tolkien', isRead=true),
    new Book('The Lord of the Rings', 'J. R. R. Tolkien', isRead=true),
    new Book('The Silmarillion', 'J. R. R. Tolkien', isRead=true),
    new Book('Middlemarch', 'George Eliot'),
    new Book('1984', 'George Orwell', isRead=true),
    new Book('Animal Farm', 'George Orwell', isRead=true),
    new Book('Frankenstein', 'Mary Shelley'),
    new Book('Jane Eyre', 'Charlotte Bronte'),
    new Book('To the Lighthouse', 'Virginia Woolf'),
    new Book('Wuthering Heights', 'Emily Bronte'),
    new Book('Lord of the Flies', 'William Golding', isRead=true),
    new Book('Through the Looking Glass', 'Lewis Carroll'),
    new Book('Alice in Wonderland', 'Lewis Carroll', isRead=true),
    new Book('Pride and Prejudice', 'Jane Austen'),
    new Book('The Wind in the Willows', 'Kenneth Grahame', isRead=true),
    new Book('The Lion, the Witch and the Wardrobe', 'C.S. Lewis', isRead=true),
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
const isReadButtons = document.querySelectorAll('.card button:nth-of-type(1)');

removeButtons.forEach(button => {
    button.addEventListener('mousedown', removeCard);
});

isReadButtons.forEach(button => {
    button.addEventListener('mousedown', toggleIsReadButton);
})
