/*---------------Query Selectors------------*/
var titleColor = document.querySelector('.header__title--color');
var searchForm = document.querySelector('.header__search-form');
var searchInput = document.querySelector('.header__search-input');
var asideForm = document.querySelector('.aside__task-form');
var titleInput = document.querySelector('.task-title__title-input');
var itemInput = document.querySelector('.task-item__item-input');
var itemBtn = document.querySelector('.task-item__item-btn');
var taskBtn = document.querySelector('.task-form__make-task-btn');
var clearBtn = document.querySelector('.task-form__clear-btn')
var filterBtn = document.querySelector('.filter-div__filter-btn');
var taskList = document.querySelector('.task-form__task-list')
var mainSection = document.querySelector('.main__section')

/*-------------Global Variables-----------*/

var taskArray = JSON.parse(localStorage.getItem('taskArray')) || [];
var currentList = JSON.parse(localStorage.getItem('currentList')) || [];

/*--------------On page Load---------------*/

if (currentList.length != 0) {
  loadCurrentList(currentList)
}
if(taskArray.length != 0) {
  loadTaskList(taskArray)
  mainRefresh(taskArray)
}
disableButtons()

/*--------------Event Listeners-------------*/

asideForm.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.className.includes('task-item__item-btn')) {
    createNewTask(currentList, 'currentList')
  }
  if (e.target.className.includes('task-form__make-task-btn')) {
    updateTaskArray()
    createTaskCard(taskArray, 'currentList')
    console.log(taskArray)
  }
  if (e.target.className.includes('task-form__clear-btn')) {
    clearAll()
  }
})

mainSection.addEventListener('click', function(e) {
  var gParId = e.target.parentNode.parentNode.parentNode.dataset.id
  if (e.target.className.includes('card-footer__urgent-btn')) {
    urgentBtn(gParId)
  }
  if (e.target.className.includes('card-footer__delete-btn')) {
    deleteCard(gParId)
  }
  if (e.target.className.includes('task-list__list-item')) {
    checkOffListItem(gParId, e)
  }
})

filterBtn.addEventListener('click', function(e) {
  filterByUrgency()
})

itemInput.addEventListener('keyup', checkInputs)

/*-----------------functions----------------*/

function makeNewTask() {
  var newList = new ToDoList(Date.now(), titleInput.value, false)
  var task = {
    id: Date.now(),
    complete: false,
    toDo: itemInput.value
  }
  newList.tasks.push(task)
  currentList.push(newList)
}

function updateNewTask(array) {
  var newArray = array.map(item => {
    item.title = titleInput.value;
    var task = {
      id: Date.now(),
      complete: false,
      toDo: itemInput.value
    }
    item.tasks.push(task);
  })
  array = newArray
}

function createNewTask(array, key) {
  if (array.length != 0) {
    updateNewTask(array)
  } else {
    makeNewTask(key)
  }
  displayTask(array)
  array[0].saveToStorage(key, currentList);
  itemInput.value = '';
  console.log(localStorage)
}

function loadCurrentList(array) {
  var newArray = array.map(item => {
    item = new ToDoList(item.id, item.title, item.urgent, item.tasks)
    return item
  })
  currentList = newArray;
  displayTask(currentList)
}

function loadTaskList(array) {
  var newArray = array.map(item => {
    item = new ToDoList(item.id, item.title, item.urgent, item.tasks, item.taskList)
    return item
  })
  taskArray = newArray;
}

function displayTask(array) {
  taskList.innerHTML = '';
  array[0].tasks.forEach((item) => {
    taskList.innerHTML += 
    `<li class="toDo-list__list-item">${item.toDo}</li>`;
  })
  titleInput.value = array[0].title
}

function createTaskCard(array, key) {
  mainSection.innerHTML = '';
  mainRefresh(array)
  localStorage.removeItem(key)
  clearAll()
}

function mainRefresh(array) {
  mainSection.innerHTML = '';
  array.forEach(item => {
    item.updateTaskList()
    createCard(item)
    addUrgentClass(item)
  })
}

function clearAll() {
  localStorage.removeItem('currentList')
  currentList = []
  titleInput.value = '';
  itemInput.value = '';
  taskList.innerHTML = '';

}

function createCard(task) {
  mainSection.innerHTML += 
  `<div class="section__task-card" data-id="${task.id}">
    <article class="task-card__card-header">
     <h2 class="card-header__task-title">${task.title}</h2>
   </article>
   <article class="task-card__card-body">
      <ul class="card-body__task-list">${task.taskList}</ul>
   </article>
   <article class="task-card__card-footer">
      <div class="card-footer__urgent-div">
        <button class="card-footer__urgent-btn"></button>
        <p class="card-footer__urgent-text">Urgent</p>
      </div>
      <div class="card-footer__delete-div">
      <button class="card-footer__delete-btn"></button>
      <p class="card-footer__delete-text">Delete</p>
      </div>
   </article>
  </div>
`
}

function updateTaskArray() {
  taskArray.push(currentList[0])
  taskArray[0].saveToStorage('taskArray', taskArray)
}

function removeAll() {
  localStorage.clear()
  taskArray = [];
  currentList = [];
}

function updateMain(array) {
  taskArray = array;
  if (taskArray.length > 0) {
    taskArray[0].saveToStorage('taskArray', taskArray)
  }
  mainSection.innerHTML = '';
  mainRefresh(taskArray)
}

function disableButtons() {
  clearBtn.disabled = true;
  itemBtn.disabled = true;
  taskBtn.disabled = true;
}

function enableButtons() {
  clearBtn.disabled = false;
  itemBtn.disabled = false;
  taskBtn.disabled = false;
}

function checkInputs() {
  if((titleInput.value != '') && (itemInput.value != '')) {
    enableButtons()
  }
}

function deleteCard(cardId) {
  updatedArray = [];
  taskArray.map(item => {
    if(item.id != cardId) {
      updatedArray.push(item)
    }
  })
  taskArray[0].deleteFromStorage('taskArray')
  updateMain(updatedArray)
}

function checkOffListItem(gparId, e) {
  updatedArray = []
  taskArray.map(item => {
    if (item.id != gparId) {
      updatedArray.push(item)
    } else {
      item.updateTaskObject(e)
      updatedArray.push(item)
    }
  })
  updateMain(updatedArray)
}

function urgentBtn(cardId) {
  var updateArray = []
  taskArray.map(item => {
    if (item.id == cardId) {
      item.updateUrgent()
      updateArray.push(item)
    } else {
      updateArray.push(item)
    }
  })
  updateMain(updateArray)
}

function addUrgentClass(item) {
  var card = document.querySelectorAll('.section__task-card')
  card.forEach(node => {
    if (node.dataset.id  == item.id) {
      card = node;
    }
  })
  if (item.urgent == true) {
    card.classList.add('section__task-card--urgent')
  } else {
    card.classList.remove('section__task-card--urgent')
  }
}

function urgentFilter() {
  var newArray = [];
  taskArray.map(item => {
    if (item.urgent == true) {
      newArray.push(item)
    }
  })
  mainRefresh(newArray)
}

function addFilterUrgent() {
  filterBtn.classList.add('filter-div__filter-btn--urgent')
}

function removeFilterUrgent() {
  filterBtn.classList.remove('filter-div__filter-btn--urgent')
}

function zeroUrgent() {
  if (mainSection.innerHTML == '') {
    mainSection.innerHTML +=
    `<h2>Make some urgent ToDo's!!! Stat!`
  }
}

function filterByUrgency() {
  if (filterBtn.className.includes('filter-div__filter-btn--urgent')) {
    removeFilterUrgent() 
    mainRefresh(taskArray)
  } else {
    urgentFilter()
    addFilterUrgent()
    zeroUrgent()
  }
}

function searchField() {
  debugger;
  var searchValue = searchInput.value.toUpperCase();
  var newArray = [];
  taskArray.forEach(item => {
    var stringTitle = (item.title.toUpperCase())
    var stringBody = (item.tasklist.toUpperCase())
    if (stringTitle.idexOf(searchValue) > -1) {
      newArray.push(item.title)
    }
    if (stringBody.indexOf(searchValue) > -1) {
      newArray.push(item.taskList)
    }
  })
  if (searchValue == '') {
    newArray = []
  }
}