 class ToDoList {
  constructor(id, title, urgent, tasks, taskList) {
    this.id = id;
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = tasks || [];
    this.taskList = '';
    this.urgentStyle = ''
  };

  saveToStorage(array, object) {
    var stringified = JSON.stringify(object);
	  localStorage.setItem(array, stringified);
  };

  deleteFromStorage(key) {
    localStorage.removeItem(key)
  };

  updateUrgent() {
    this.urgent = !this.urgent
  }

  urgentStyle() {
    this.urgentStyle = '';
    if (this.urgent == true) {
      this.urgentStyle = 'class=""'
    }
  }
  updateTaskList() {
    this.taskList = '';
    this.tasks.map(item => {
      if (item.complete == false) {
        this.taskList += 
        `<li class="task-list__list-item" contenteditable="true" data-id="${item.id}">${item.toDo}</li>`
      } else {
        this.taskList += 
        `<li class="task-list__list-item task-list__list-item--checked" contenteditable="true" data-id="${item.id}">${item.toDo}</li>`
      }
    })
  }

  updateTask() {
    this.tasks.map((item) => {
      this.taskList += 
      `<li class="task-list__list-item">${item}</li>`;
    })
  };

  updateTaskObject(e) {
    this.tasks.forEach(item => {
      if (e.target.dataset.id == item.id) {
        item.complete = !item.complete
      }
    })
  }
};