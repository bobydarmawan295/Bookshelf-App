const UNCOMPLETED_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_ID = "completeBookshelfList";
const BOOKSHELF_ITEMID = "itemId";

function addbuku() {
    const unreadBookList = document.getElementById(UNCOMPLETED_BOOK_ID);
    const readbooklist = document.getElementById(COMPLETED_BOOK_ID);
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;

    const isCompleted = document.getElementById("inputBookIsComplete").checked;
    const booklist = makebuku(title, author, year, isCompleted);

    const bookObject = composebookObject(title, author, year, false);
    booklist[BOOKSHELF_ITEMID] = bookObject.id;
    bookshelf.push(bookObject);


    if (isCompleted) {
        readbooklist.append(booklist);
    } else {
        unreadBookList.append(booklist);
    }
    updateDataToStorage();
}

function makebuku(title, author, year, isCompleted) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const labelauthor = document.createElement("label");
    labelauthor.innerText = "Penulis : ";
    const textauthor = document.createElement("p");
    textauthor.classList.add("author");
    textauthor.setAttribute("style", "display: inline");
    textauthor.innerText = author;
    const wrapauthor = document.createElement("div");
    wrapauthor.classList.add("wrap1")
    wrapauthor.append(labelauthor, textauthor)


    const labelyear = document.createElement("label");
    labelyear.innerText = "Tahun : ";
    const textyear = document.createElement("p");
    textyear.classList.add("year");
    textyear.setAttribute("style", "display: inline");
    textyear.innerText = year;
    const wrapyear = document.createElement("div");
    wrapyear.append(labelyear, textyear)



    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.append(textTitle, wrapauthor, wrapyear);

    const action = document.createElement("div");
    action.classList.add("action");

    textContainer.append(action);

    if (isCompleted) {
        action.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        action.append(
            creategreenButton(),
            createTrashButton()
        );

    }
    return textContainer;
}

function createButton(buttonTypeClass, eventListener, textButton) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addbookToCompleted(bookElement) {
    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookauthor = bookElement.querySelector(".author").innerText;
    const bookyear = bookElement.querySelector(".year").innerText;

    const newBook = makebuku(bookTitle, bookauthor, bookyear, true);

    const book = findbook(bookElement[BOOKSHELF_ITEMID]);
    book.isCompleted = true;
    newBook[BOOKSHELF_ITEMID] = book.id;

    const listCompleted = document.getElementById(COMPLETED_BOOK_ID);
    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function creategreenButton() {
    return createButton(
        "green",
        function (event) {
            addbookToCompleted(event.target.parentElement.parentElement);
        },
        "Telah dibaca"
    );

};

function removebookFromCompleted(bookElement) {

    const bookPosition = findbookIndex(bookElement[BOOKSHELF_ITEMID]);
    bookshelf.splice(bookPosition, 1);

    bookElement.remove();
    alert("Buku telah dihapus");
    updateDataToStorage();

}

function createTrashButton() {
    return createButton("red", function (event) {
            removebookFromCompleted(event.target.parentElement.parentElement);
        },
        "Hapus buku"
    );

}

function undobookFromCompleted(bookElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const bookauthor = bookElement.querySelector(".author").innerText;
    const bookyear = bookElement.querySelector(".year").innerText;

    const newBook = makebuku(bookTitle, bookauthor, bookyear, false);
    const book = findbook(bookElement[BOOKSHELF_ITEMID]);
    book.isCompleted = false;
    newBook[BOOKSHELF_ITEMID] = book.id;

    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function createUndoButton() {
    return createButton("green", function (event) {
            undobookFromCompleted(event.target.parentElement.parentElement);
        },
        "Belum selesai dibaca"
    );
}