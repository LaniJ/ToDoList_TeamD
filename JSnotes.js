
if (!localStorage.getItem('currentUser')) {
    window.location = 'login.html';
}

const user = JSON.parse(localStorage.getItem('currentUser'))

// select all necessary elements. query selector can select elements based on css selectors

const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')

const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')


// Use local storage to storge lists, tasks. set variable for the list that is selected
const Local_Storage_List_Key = user.username + '.task.lists'
const Local_Storage_Selected_List_Id_Key = user.username + '.task.selectedListId'
let lists = JSON.parse(localStorage.getItem(Local_Storage_List_Key)) || [];
let selectedListId = localStorage.getItem(Local_Storage_Selected_List_Id_Key)


// event listeners excute code when a user does something on the browser
// if user clicks an li
listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
});
// click event for every time we select something in the list container
tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId)
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedList)
    }
});
// maybe use a change event listener

clearCompleteTasksButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
});

// return all lists asides from the one selected
deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null    
    saveAndRender()
})

//  e.PD - Prevent page from submitting and refreshing when input it put
// if list isn't empty, createList()
newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName.trim() === "") return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list);
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName.trim() === "") return
    const task = createList(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(task)
    saveAndRender()
})

// use date to make every id unique
function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] }
};

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
};

function saveAndRender() {
    save();
    render()
};

// save lists to local storage
function save() {
    localStorage.setItem(Local_Storage_List_Key, JSON.stringify(lists))
    localStorage.setItem(Local_Storage_Selected_List_Id_Key, selectedListId)
};

// render our lists and show updated list
// in this we create an li that has class = list-name


// we style display box not to show if there is no element and to show if there is
function render() {
  clearElement(listsContainer)
  renderLists()

  const selectedList = lists.find(list => list.id === selectedListId)
  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none'
  } else {
    listDisplayContainer.style.display = ''
    listTitleElement.innerText = selectedList.name
    renderTaskCount(selectedList)
    clearElement(tasksContainer)
    renderTasks(selectedList)
  }
}

// loop through tasks.
// Use a template (allows html to be called in JS without showing it showing in output)
// importNode helps us clone our task to create a new element

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
      const taskElement = document.importNode(taskTemplate.content, true)
      const checkbox = taskElement.querySelector('input')
      checkbox.id = task.id
      checkbox.checked = task.complete
      const label = taskElement.querySelector('label')
      label.htmlFor = task.id
      label.append(task.name)
      tasksContainer.appendChild(taskElement)
    })
  }

// use the filter method instead of a for loop (with an arrow function) e.g
// let bigCities = cities.filter(city => city.population > 3000000);
// console.log(bigCities);

//filter to find incomplete. 
function renderTaskCount(selectedList) {
    const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

// create element, set class name, and name oflist
//append child is used to add an html element
// use list.name cus each element is an object with name and ID (identifies each list)

function renderLists() {
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

// checks if an element has "children" and removes it
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()

function logOutBtn(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location = 'login.html'   
}
   