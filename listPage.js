// to modify users details in page

if (localStorage.getItem('currentUser')) {
    let currentObj = JSON.parse(localStorage.getItem('currentUser'))
    let objName = currentObj.username;
    document.getElementById("clientDetail").textContent = objName;
}

// add function to logout button 

function logOutBtn(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location = 'Templogin.html'
}
// JS to check if there's an input

function validInput() {
    if (userInput.length > 0 && userInput !== " ") {
        return true;
    }
    else {
        return false;
    }
}

// JS for 'all lists' group (To show a list of tasks)
// use document.querySelector to call by CSS tags

// - this is the container for all our different lists
const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('data-new-list-form')
const newListInput = document.querySelector('data-new-list-input')
const deleteListButton = document.querySelector('data-delete-list-button')


// save data with local storage
// if (localStorage.getItem('task.lists')) {

//     let lists = Json.parse(localStorage.getItem('task.lists'))
//     lists.push(list);
//     localStorage.setItem('task.lists', JSON.stringify(lists))
//   } else {
//     let lists = [list];
//     localStorage.setItem('task.lists', JSON.stringify(lists))
//   }
  
  const Local_storage_list_key = 'task.lists'
  const Local_storage_selected_list_Id_key = 'task.selectedlistId'
  let lists = JSON.parse(localStorage.getItem(Local_storage_list_key)) || []
  let selectedListId = localStorage.getItem('Local_storage_selected_list_Id_key')

// this array will hold all of out lists. It's empty cus by default there's no list when we sign in
// let lists = [{
//     id: 1,
//     name: 'projects'
// }, {
//     id: 2,
//     name: 'christmas shopping'
// }];


// NEED HELP!
listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId =  e.target.dataset.listId
        saveandRender();
    }
})

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null;
    saveandRender();
})

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === " ")
    return
    const list = creatList(listName)
    newListInput.value = null // to clear the input written
    listd.push(list);
    render()
})

function createList(name) {
    return {id: Date.now().toString(), name: name, tasks: [] }
}

function saveandRender(){
    save();
    render();
}

function save() {
    localStorage.setItem(Local_storage_list_key, JSON.stringify(lists))
    localStorage.setItem(Local_storage_selected_list_Id_key, selectedListId)
}
// - create a function that makes lists
// - this function, first make sure the list container is empty 
// by using function clearElement()
//The forEach() method calls a function once for each element in an array, in order.
// for each list item entered by user, create a listElement by using DOM - This sets the element
// then set class, set text. 
// to have a selected list with a diff class, we'll add an ID to each list inputed
// change each list item to an object with name and Id values
// add data attribute

function render() {
    clearELement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        if (list.id === selectedListId) {
            listElement.classList.add('active-list')
        }
        listsContainer.appendChild(listElement)
    })
}

// call function below, "emptyList"
// how does the fuction know which what "element" is?

function clearELement(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
render();

