import { books, loadItems, sortItems, addBookToLibrary } from "./library";
import defaultBooks from "./defaultBooks";

defaultBooks.forEach(addBookToLibrary);

sortItems(books, "title");
loadItems(books);
