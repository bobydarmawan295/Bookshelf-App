const STORAGE_KEY = "BOOKSHELF_APPS";

let bookshelf = [];

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(bookshelf);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        bookshelf = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composebookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function findbook(bookId) {
    for (book of bookshelf) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findbookIndex(bookId) {
    let index = 0
    for (book of bookshelf) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFrombookshelf() {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_ID);

    for (book of bookshelf) {
        const newbook = makebuku(book.title, book.author, book.year, book.isCompleted);
        newbook[BOOKSHELF_ITEMID] = book.id;
        if (book.isCompleted) {
            listCompleted.append(newbook);
        } else {
            listUncompleted.append(newbook);
        }
    }
}