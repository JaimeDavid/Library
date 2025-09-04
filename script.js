const addBook = document.querySelector('.add');


function addRow(){
    let table = document.querySelector('.table');
    let row = document.createElement('tr');
    for (let i = 0; i < 4; i++){
        let cell = document.createElement('td')
        row.appendChild(cell);
    }
    table.appendChild(row);
}
addBook.addEventListener('click', addRow);

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
    // function that provides the information on the book
    this.info = function(){
        return this.title+' by '+this.author+', '+this.pages+' pages,'+this.read; ;
    }

}