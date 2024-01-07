const library = []
const libraryMain = document.getElementById('library');

function Book(title, author, coverSrc='./images/default-cover.jpg', isRead=false) {
    this.title = title;
    this.author = author;
    this.coverSrc = coverSrc; 
    this.isRead = isRead;
}

function addBookToLibrary(newBook) {
    if (library.some(book => book.title == newBook.title)) return
    library.push(newBook)
}

function loadItems(items) {
    for (let i = 0; i < items.length; i += 1) {
        const bookCard = document.createElement('div')
        const bookCover = document.createElement('img')
        const bookTitle = document.createElement('h3')
        const bookAuthor = document.createElement('p')

        bookCard.classList.add('card')
        bookCover.src = items[i].coverSrc;
        bookCover.alt = items[i].title + ' book cover'
        bookTitle.textContent = items[i].title;
        bookAuthor.textContent = items[i].author;

        bookCard.appendChild(bookCover)
        bookCard.appendChild(bookTitle)
        bookCard.appendChild(bookAuthor)

        libraryMain.appendChild(bookCard);
    }
}

const theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', './images/the-hobbit.jpg')
const theLordOfTheRings = new Book('The Lord of the Rings', 'J. R. R. Tolkien', './images/the-lord-of-the-rings.jpg')
const theSilmarillion = new Book('The Silmarillion', 'J. R. R. Tolkien', './images/the-silmarillion.jpg')

addBookToLibrary(theHobbit)
addBookToLibrary(theLordOfTheRings)
addBookToLibrary(theSilmarillion)

loadItems(library)