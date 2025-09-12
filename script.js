//variables
const myLibrary = [{ title: 'hoobit', author: 'me', pages: 100, read: 'Yes' },
  { title: 'the Rabbit', author: 'you', pages: 300, read: 'Yes' }];
const headers = ['Title', 'Author', 'Pages', 'Read','Delete'];

//functions
//addrow function adds row to the table that will hold the information
function addRow(){
    let table = document.querySelector('.table');
    let row = document.createElement('tr');
    row.classList.add("current");
    for (let i = 0; i < 4; i++){
        let cell = document.createElement('td')
        cell.textContent ='h';
        row.appendChild(cell);
    }
    table.appendChild(row);
}
//Book constructor that will create the book that is required.
function Book(title, author, pages, read){
    //safeguard for constructor, so it must always be called with new//
    if(!new.target){
        throw error("You must use the 'new' operator to call the constructor");
    }
    //Book object  properties
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Creates a book given the data, adds an ID and saves it in the array.
function addBookToLibrary(title, author, pages, read){
    
    let book = new Book(title, author, pages, read);
    book.id = crypto.randomUUID();
    myLibrary.push(book);

}
//function that read everybook in the array and places it in the table

function bookData(){
    let table = document.querySelector('.table');
    for(const book of myLibrary){        
        let row = document.createElement('tr');
        console.log(book);
        for (const key in book){
            let cell = document.createElement('td')
            cell.textContent = book[key];
            row.appendChild(cell);          

        }
        table.appendChild(row);
    }
}
//creates headers for the table when a book is created
function addHeaders(){
    let table = document.querySelector('.table');
    let row = document.createElement('tr');
    for(element in headers){
        let cell = document.createElement('th');
        cell.textContent = headers[element];
        row.appendChild(cell);
    }
    table.appendChild(row);
}
//reset input data in dialog form
function resetInputData(){
    dialogTitle.value = '';
    dialogAuthor.value ='';
    dialogPages.value ='';
    dialogRead.checked = false;
}



//Dom manipulation
//HTML elements variables
const dialog = document.querySelector('dialog');
const addBookButton = document.querySelector('.add');
const closeButton = document.querySelector("#close");
const submit = document.querySelector('#submit');
const dialogTitle = document.querySelector('#title');
const dialogAuthor = document.querySelector("#author");
const dialogPages = document.querySelector('#pages');
const dialogRead =document.querySelector('#read');



// event listeners

addBookButton.addEventListener('click', ()=>{
    dialog.showModal();
});

closeButton.addEventListener('click', () =>{
    dialog.close();
});

submit.addEventListener('click', (event)=>{
    event.preventDefault()
    addHeaders();
    addBookToLibrary(dialogTitle.value, dialogAuthor.value, dialogPages.value, dialogRead.checked);
    resetInputData();
    dialog.close();

});