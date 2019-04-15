 class ToDoList {
  constructor(id, title, urgent, tasks, taskList) {
    this.id = id;
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = tasks || [];
    this.taskList = taskList || '';
  };

  saveToStorage(array, object) {
    var stringified = JSON.stringify(object);
	  localStorage.setItem(array, stringified);
  };

  deleteFromStorage(array) {
    var parsed = JSON.parse(localStorage.getItem)

  };

  updateToDo() {
    this.taskList = []
    this.tasks.map((item) => {
      this.taskList += 
      `<li class="task-list__list-item" contenteditable="true">${item.toDo}</li>`;
    })
  };

  updateTask() {
    this.tasks.map((item) => {
      this.taskList += 
      `<li class="task-list__list-item">${item}</li>`;
    })
  };

};