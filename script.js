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

const theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien', './images/the-hobbit.jpg');
const theLordOfTheRings = new Book('The Lord of the Rings', 'J. R. R. Tolkien', './images/the-lord-of-the-rings.jpg');
const theSilmarillion = new Book('The Silmarillion', 'J. R. R. Tolkien', './images/the-silmarillion.jpg');
const middlemarch = new Book('Middlemarch', 'George Eliot', './images/middlemarch.jpg');
const book1984 = new Book('1984', 'George Orwell', './images/1984.jpg');
const animalFarm = new Book('Animal Farm', 'George Orwell', './images/animal-farm.jpg');
const frankenstein = new Book('Frankenstein', 'Mary Shelley', './images/frankenstein.jpg');
const janeEyre = new Book('Jane Eyre', 'Charlotte Bronte', './images/jane-eyre.jpg');
const toTheLighthouse = new Book('To the Lighthouse', 'Virginia Woolf', './images/to-the-lighthouse.jpg');
const wutheringHeights = new Book('Wuthering Heights', 'Emily Bronte', './images/wuthering-heights.jpg');
const lordOfTheFlies = new Book('Lord of the Flies', 'William Golding', './images/lord-of-the-flies.jpg');
const throughTheLookingGlass = new Book('Through the Looking Glass', 'Lewis Carroll', './images/through-the-looking-glass.jpg');
const aliceInWonderland = new Book('Alice in Wonderland', 'Lewis Carroll', './images/alice-in-wonderland.jpg');
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', './images/pride-and-prejudice.jpg');
const theWindInTheWillows = new Book('The Wind in the Willows', 'Kenneth Grahame', './images/the-wind-in-the-willows.jpg');
const theLionTheWitchAndTheWardrobe = new Book('The Lion, the Witch and the Wardrobe', 'C.S. Lewis', './images/the-lion-the-witch-and-the-wardrobe.jpg');
const theHorseAndHisBoy = new Book('The Horse and his Boy', 'C.S. Lewis', './images/the-horse-and-his-boy.jpg');
const theMagiciansNephew = new Book("The Magician's Nephew", 'C.S. Lewis', './images/the-magicians-nephew.jpg');
const voyageOfTheDawnTreader = new Book('Voyage of the Dawn Treader', 'C.S. Lewis', './images/voyage-of-the-dawn-treader.jpg');
const aClockworkOrange = new Book('A Clockwork Orange', 'Anthony Burgess', './images/a-clockwork-orange.jpg');
const princeCaspian = new Book('Prince Caspian', 'C.S. Lewis', './images/prince-caspian.jpg');
const theLastBattle = new Book('The Last Battle', 'C.S. Lewis', './images/the-last-battle.jpg');
const theSilverChair = new Book('The Silver Chair', 'C.S. Lewis', './images/the-silver-chair.jpg');
const greatExpectations = new Book ('Great Expectations', 'Charles Dickes', './images/great-expectations.jpg');

addBookToLibrary(theHobbit);
addBookToLibrary(theLordOfTheRings);
addBookToLibrary(theSilmarillion);
addBookToLibrary(middlemarch);
addBookToLibrary(book1984);
addBookToLibrary(animalFarm);
addBookToLibrary(frankenstein);
addBookToLibrary(janeEyre);
addBookToLibrary(toTheLighthouse);
addBookToLibrary(wutheringHeights);
addBookToLibrary(lordOfTheFlies);
addBookToLibrary(throughTheLookingGlass);
addBookToLibrary(aliceInWonderland);
addBookToLibrary(prideAndPrejudice);
addBookToLibrary(theWindInTheWillows);
addBookToLibrary(theLionTheWitchAndTheWardrobe);
addBookToLibrary(theHorseAndHisBoy);
addBookToLibrary(theMagiciansNephew);
addBookToLibrary(voyageOfTheDawnTreader);
addBookToLibrary(aClockworkOrange);
addBookToLibrary(princeCaspian);
addBookToLibrary(theLastBattle);
addBookToLibrary(theSilverChair);
addBookToLibrary(greatExpectations);

loadItems(library)