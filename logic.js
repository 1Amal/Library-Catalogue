// 2024, Amal Kariyawasam
/* Pseudo Code
1)Form input fields: author, title, numberOfPages,read and button "New Book" button
2) When "New Book" button is clicked form data will be captured using function "addBookToLibrary()"
3) function "addBookToLibrary()" will create a Book Object by calling the "function bookData" constructor to store the user entered data into an Array "myLibrary".
4) function "addBookToLibrary()" will call function "bookInfoDisplay" to loop through the Array "myLibrary" and display on the webpage as a "book info Card".
5) Each book "book info Card" will have a button "Delete Book" which will delete the book from the Array "myLibrary", using the index number of the array. Then call up the function "bookInfoDisplay" to update the webpage. 
6) Each book "book info Card" will have a button "Read" which will update the relevant object "book.read=yes". Then call up the function "bookInfoDisplay" to update the webpage. 
*/

const myLibrary = []; // Array where all the newly created book will be stored

const LibraryStatusDiv = document.querySelector(".LibraryStatusDiv");
const submitButton = document.querySelector("#submitButton");

const bookInfoAuthor = document.querySelector(".bookInfoAuthor");
const bookInfoTitle = document.querySelector(".bookInfoTitle");
const bookInfoNumberOfPages = document.querySelector(".bookInfoNumberOfPages");
const bookInfoRead = document.querySelector(".bookInfoRead");

//Code for creating New Book Object

class bookData {
  // Refactored code into a Class
  constructor(author, title, numberOfPages, read) {
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.read = read;
  }

  readStatusToggle() {
    this.read = !this.read; // Toggles the read status
    new bookInfoDisplay();
  }
}

//Code to add the new book details object into the myLibrary array

class addBookToLibrary {
  constructor() {
    let bookSubmitForm = new FormData(
      document.getElementById("bookSubmitForm")
    );
    let authorValue = bookSubmitForm.getAll("author");
    let titleValue = bookSubmitForm.getAll("title");
    let numberOfPagesValue = bookSubmitForm.getAll("numberOfPages");
    let readValue = bookSubmitForm.getAll("read");

    //Following code will store the data captured from above code in the myLibrary array
    let newBook = new bookData(
      authorValue[0],
      titleValue[0],
      numberOfPagesValue[0],
      readValue[0]
    );
    myLibrary.push(newBook);

    // LibraryStatusDiv.textContent="Current list of available books in the Library database";
    new bookInfoDisplay();
  }
}

//Following function will update the Webpage dynamically with the data in the myLibrary array

class bookInfoDisplay {
  constructor() {
    LibraryStatusDiv.textContent =
      "Current list of available books in the Library database";

    if (myLibrary.length == 0) {
      console.log("Library is empty");
      LibraryStatusDiv.textContent =
        "I am sorry, Library does not have any books, Use the form below to add some books ";
    } else {
      for (let i = 0; i < myLibrary.length; i++) {
        //Following code block will create a Book info card in the HTML Dom
        const newDiv = document.createElement("div");
        newDiv.textContent =
          "Author Name: " +
          myLibrary[i]["author"] +
          " | " +
          "Title Name: " +
          myLibrary[i]["title"] +
          " | " +
          "Number of Pages: " +
          myLibrary[i]["numberOfPages"] +
          " | " +
          "Book Read: " +
          myLibrary[i]["read"];

        newDiv.classList.add("bookDetails", i);

        LibraryStatusDiv.appendChild(newDiv);
        //Following code block will create a Delete Button and attach an event listener
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete Book";
        deleteButton.classList.add(i);
        newDiv.appendChild(deleteButton);

        deleteButton.addEventListener("click", (a) => {
          // Get element class(es)
          let elementClass = a.target.className;
          // If element has class(es)
          if (elementClass !== "") {
            console.log(typeof elementClass);
            myLibrary.splice(Number(elementClass), 1);
            console.log(myLibrary);
            LibraryStatusDiv.textContent =
              "Current list of available books in the Library database";
            new bookInfoDisplay();
          }
          // If element has no classes
          else {
            console.log("An element without a class was clicked");
          }
        });

        //Following code block will create a Read Button and attach an event listener

        const readButton = document.createElement("button");
        readButton.innerHTML = "Book read toggle";
        readButton.classList.add(i);
        newDiv.appendChild(readButton);

        readButton.addEventListener("click", (a) => {
          // Get element class(es)
          let elementClass = a.target.className;
          // If element has class(es)
          if (elementClass !== "") {
            console.log(elementClass);
            console.log(myLibrary);
            LibraryStatusDiv.textContent =
              "Current list of available books in the Library database";
            myLibrary[Number(elementClass)].readStatusToggle(); // This will call up the function to toggle true or False
          }
          // If element has no classes
          else {
            console.log("An element without a class was clicked");
          }
        });
      }
    }
  }
}

class formValidation {
  constructor() {
    this.form;
    this.authorName;
    this.bookTitle;
    this.numberOfPages;
    this.errorNumberOfPages;
    this.formStatus = 0;
  }
  readValue() {
    this.form = document.querySelector("form");
    this.authorName = document.querySelector("#author");
    this.bookTitle = document.querySelector("#title");
    this.numberOfPages = document.querySelector("#numberOfPages");

    this.errorNumberOfPages = document.querySelector(
      "#numberOfPages + span.error"
    );
    this.errorAuthorName = document.querySelector("#author + span.error");
    this.errorTitle = document.querySelector("#title + span.error");
  }

  checkForValidity() {
    this.readValue();

    this.numberOfPages.addEventListener("input", (event) => {
      if (this.numberOfPages.validity.valid) {
        console.log("Number of Pages are valid");
        this.errorNumberOfPages.textContent = "No of pages within range";

        if (
          this.authorName.validity.valid &&
          this.bookTitle.validity.valid &&
          this.numberOfPages.validity.valid
        ) {
          submitButton.disabled = false;
        }
      } else {
        submitButton.disabled = true;
        this.showError();
      }
    });

    this.authorName.addEventListener("input", (event) => {
      if (this.authorName.validity.valid) {
        this.errorAuthorName.textContent = "Author Name valid";

        if (
          this.authorName.validity.valid &&
          this.bookTitle.validity.valid &&
          this.numberOfPages.validity.valid
        ) {
          submitButton.disabled = false;
        }
      } else {
        submitButton.disabled = true;
        this.errorAuthorName.textContent = "Please Enter Author Name";
      }

      this.bookTitle.addEventListener("input", (event) => {
        if (this.bookTitle.validity.valid) {
          this.errorTitle.textContent = "Book Title Valid";
          if (
            this.authorName.validity.valid &&
            this.bookTitle.validity.valid &&
            this.numberOfPages.validity.valid
          ) {
            submitButton.disabled = false;
          }
        } else {
          submitButton.disabled = true;
          this.errorTitle.textContent = "Please Enter Book Title";
        }
      });
    });
  }

  showError() {
    if (this.numberOfPages.validity.valueMissing) {
      console.log("Value missing");
      this.errorNumberOfPages.textContent = "Please Enter Number of pages";
    } else if (this.numberOfPages.validity.rangeUnderflow) {
      console.log("Value Too Short");
      this.errorNumberOfPages.textContent =
        "Number of Pages should be above 10";
    } else if (this.numberOfPages.validity.rangeOverflow) {
      console.log("Value Too Long");
      this.errorNumberOfPages.textContent =
        "Number of Pages should be less than 1000";
    }
  }
}

const newInstanceformValidation = new formValidation();

submitButton.addEventListener("click", function () {
  new addBookToLibrary();
});

newInstanceformValidation.checkForValidity();
