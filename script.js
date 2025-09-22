//variables
let myLibrary = [];
const headers = ['Title', 'Author', 'Pages', 'Read','Delete'];
let headersFlag = false;

//functions

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

// Creates a book given the data,  and saves it in the array.
function addBookToLibrary(title, author, pages, read){
    
    let book = new Book(title, author, pages, read); 
    book['id'] =  crypto.randomUUID();
    myLibrary.push(book);

}


//function that read everybook in the array and places it in the table
function bookData(){   

    for(const book of myLibrary){
        // Correctly check if a row with this book's ID already exists.
        // The `find` method is ideal for this.
        let existingRow = table.querySelector(`tr[data-id="${book['id']}"]`);
        
        // If an existing row is found, skip this book and move to the next one.
        if (existingRow) {            
            continue;
        }

        let row = document.createElement('tr');
        
        // Loop through the book's properties to create cells.
        for (const key in book){
            if(key === 'id'){
                continue; // Skip the 'id' property since it's used for the data attribute.
            }
            let cell = document.createElement('td')
            if(key === 'read'){
                let toggleButton = document.createElement('button');                
                if(book[key] === true){
                    toggleButton.ClassName = 'read';
                    toggleButton.textContent = 'Read'
                }else{
                    toggleButton.ClassName = 'unread';
                    toggleButton.textContent = 'Unread'
                }
                toggleButton.addEventListener('click',()=>{
                    if(toggleButton.className === 'read'){
                        toggleButton.className = 'unread'
                        toggleButton.textContent = 'Unread'
                        book[key] = false;
                        
                    }else{
                        toggleButton.className = 'read'
                        toggleButton.textContent = 'Read'
                        book[key] = true;
                         
                         
                    }
                })
                cell.appendChild(toggleButton);                
            }else {
                cell.textContent = book[key]; 
            }
                       
            row.appendChild(cell);
        }
        
        let deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = 'delete';
        let deleteCell = document.createElement('td')
        deleteCell.className = 'delete'
        deleteButton.addEventListener('click', ()=>{
  
            let id = book['id'];            
            myLibrary = myLibrary.filter(book => book['id'] !== id);
            row.remove();
        })

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);


        // Set the data-id attribute after all cells are created.
        // It's crucial to set the attribute AFTER the row has been created.
        row.setAttribute('data-id', book['id']);
        
        // Append the new row to the table.
        table.appendChild(row);        
    }
}

function deleteRow(id){  
    
    row.remove()
}
//creates headers for the table when a book is created
function addHeaders(){
    if (headersFlag === false){
        let table = document.querySelector('.table');
        let row = document.createElement('tr');
        for(element in headers){
            let cell = document.createElement('th');
            cell.textContent = headers[element];
            row.appendChild(cell);
        }
        table.appendChild(row);
        headersFlag = true;

        }

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
const table = document.querySelector('.table');
const row = table.querySelector('tr')
const dialog = document.querySelector('dialog');
const addBookButton = document.querySelector('.add');
const closeButton = document.querySelector("#close");
const submit = document.querySelector('#submit');
const dialogTitle = document.querySelector('#title');
const dialogAuthor = document.querySelector("#author");
const dialogPages = document.querySelector('#pages');
const dialogRead = document.querySelector('#read');
const deleteButton = document.querySelectorAll('.deleteButton');



// event listeners

addBookButton.addEventListener('click', ()=>{
    dialog.showModal();
});

closeButton.addEventListener('click', () =>{
    dialog.close();
});

submit.addEventListener('click', (event)=>{
    event.preventDefault();    
    addBookToLibrary(dialogTitle.value, dialogAuthor.value, dialogPages.value, dialogRead.checked);
    addHeaders();
    bookData();;
    resetInputData();
    dialog.close();

});

