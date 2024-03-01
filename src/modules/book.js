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

export default Book;
