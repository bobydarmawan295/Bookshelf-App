document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addbuku();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFrombookshelf();
});

const searchBook = document.getElementById("searchBook")
searchBook.addEventListener("submit", function (event) {
    event.preventDefault()
    let searchkey = document.getElementById("searchBookTitle").value;
    console.log(searchkey);
    let book_list = document.getElementsByClassName("book_list")
    for (let i = 0; i < book_list.length; i++) {
        let book_item = book_list[i].getElementsByClassName("book_item")

        for (let j = 0; j < book_item.length; j++) {
            let title = book_item[j].querySelectorAll("h3")[0].innerText;
            const muncul = document.querySelector(".book_item")
            if (searchkey == title) {
                muncul.setAttribute("style", "display: block")
            } else {
                muncul.setAttribute("style", "display: none")
            }
        }
    }
});