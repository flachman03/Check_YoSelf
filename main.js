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
  cardOnPageLoad(taskArray)
}

/*--------------Event Listeners-------------*/

asideForm.addEventListener('click', function(e) {
  e.preventDefault()
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
    `<li class="task-list__list-item">${item.toDo}</li>`;
  })
  titleInput.value = array[0].title
}

function createTaskCard(array, key) {
  mainSection.innerHTML = '';
  array.forEach(item => {
    item.updateToDo()
    createCard(item)
  })
  localStorage.removeItem(key)
  clearAll()
}

function cardOnPageLoad(array) {
  array.forEach(item => {
    item.updateToDo()
    createCard(item)
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
      <button class="card-footer__urgent-btn"></button>
      <button class="card-footer__delete-btn"></button>
   </article>
  </div>
`
}

function updateTaskArray() {
  taskArray.push(currentList[0])
  taskArray[0].saveToStorage('taskArray', taskArray)
  console.log(taskArray)
}

function removeAll() {
  localStorage.clear()
  taskArray = [];
  currentList = [];
}




