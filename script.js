const library = []
const libraryMain = document.getElementById('library');

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

function addBookToLibrary(newBook) {
    if (library.some(book => book.title == newBook.title)) return
    library.push(newBook)
}

function clearLibrary() {
    while (libraryMain.lastChild) {
        libraryMain.removeChild(libraryMain.firstChild)
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

const theHobbit = new Book('The Hobbit', 'J. R. R. Tolkien');
const theLordOfTheRings = new Book('The Lord of the Rings', 'J. R. R. Tolkien');
const theSilmarillion = new Book('The Silmarillion', 'J. R. R. Tolkien');
const middlemarch = new Book('Middlemarch', 'George Eliot');
const book1984 = new Book('1984', 'George Orwell');
const animalFarm = new Book('Animal Farm', 'George Orwell');
const frankenstein = new Book('Frankenstein', 'Mary Shelley');
const janeEyre = new Book('Jane Eyre', 'Charlotte Bronte');
const toTheLighthouse = new Book('To the Lighthouse', 'Virginia Woolf');
const wutheringHeights = new Book('Wuthering Heights', 'Emily Bronte');
const lordOfTheFlies = new Book('Lord of the Flies', 'William Golding');
const throughTheLookingGlass = new Book('Through the Looking Glass', 'Lewis Carroll');
const aliceInWonderland = new Book('Alice in Wonderland', 'Lewis Carroll');
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen');
const theWindInTheWillows = new Book('The Wind in the Willows', 'Kenneth Grahame');
const theLionTheWitchAndTheWardrobe = new Book('The Lion, the Witch and the Wardrobe', 'C.S. Lewis');
const theHorseAndHisBoy = new Book('The Horse and his Boy', 'C.S. Lewis');
const theMagiciansNephew = new Book("The Magician's Nephew", 'C.S. Lewis');
const voyageOfTheDawnTreader = new Book('Voyage of the Dawn Treader', 'C.S. Lewis');
const aClockworkOrange = new Book('A Clockwork Orange', 'Anthony Burgess');
const princeCaspian = new Book('Prince Caspian', 'C.S. Lewis');
const theLastBattle = new Book('The Last Battle', 'C.S. Lewis');
const theSilverChair = new Book('The Silver Chair', 'C.S. Lewis');
const greatExpectations = new Book('Great Expectations', 'Charles Dickes');
const wolfHall = new Book('Wolf Hall', 'Hilary Mantel');
const bringUpTheBodies = new Book('Bring Up The Bodies', 'Hilary Mantel');
const theMirrorAndTheLight = new Book('The Mirror and the Light', 'Hilary Mantel');
const gulliversTravels = new Book("Gulliver's Travels", 'Jonathan Swift');
const persuasion = new Book('Persuasion', 'Jane Austen');
const vanityFair = new Book('Vanity Fair', 'William Makepeace Thackeray');
const emma = new Book('Emma', 'Jane Austen');
const robinsonCrusoe = new Book('Robinson Crusoe', 'Daniel Defoe');
const theRemainsOfDay = new Book('The Remains of the Day', 'Kazuo Ishiguro');
const senseAndSensibility = new Book('Sense and Sensibility', 'Jane Austen');
const villette = new Book('Villette', 'Charlotte Bronte');
const mrsDalloway = new Book('Mrs Dalloway', 'Virginia Woolf');
const theEndOfTheAffair = new Book('The End of the Affair', 'Graham Greene');
const theWomanInWhite = new Book('The Woman in White', 'Wilkie Collins');
const bleakHouse = new Book('Bleak House', 'Charles Dickens');
const possession = new Book('Possession', 'A. S. Byatt');

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
addBookToLibrary(wolfHall);
addBookToLibrary(bringUpTheBodies);
addBookToLibrary(theMirrorAndTheLight);
addBookToLibrary(gulliversTravels);
addBookToLibrary(persuasion);
addBookToLibrary(vanityFair);
addBookToLibrary(emma);
addBookToLibrary(robinsonCrusoe);
addBookToLibrary(theRemainsOfDay);
addBookToLibrary(senseAndSensibility);
addBookToLibrary(villette);
addBookToLibrary(mrsDalloway);
addBookToLibrary(theEndOfTheAffair);
addBookToLibrary(theWomanInWhite);
addBookToLibrary(bleakHouse);
addBookToLibrary(possession);

sortItems(library, 'title')
loadItems(library)
