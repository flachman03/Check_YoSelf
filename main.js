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

/*-------------Global Variables-----------*/

var taskArray = [];

/*--------------On page Load---------------*/

/*--------------Event Listeners-------------*/

/*-----------------functions----------------*/

const createTask = (taskList, titleInput) => {
  var newList = new ToDoList(Date.now(), titleInput.value, false, taskList.value)
  taskArray.push(newList)
}


