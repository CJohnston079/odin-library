const library = []

function Book(title, author, pages, isRead=false, isRecommended) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.isRecommended = isRecommended;
}

function addBookToLibrary(newBook) {
    if (library.some(book => book.title == newBook.title)) return
    library.push(newBook)
}