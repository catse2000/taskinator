var buttonEl = document.querySelector("#save-task"); //save query for "#save-task" to a variable
var tasksToDoEl = document.querySelector("#tasks-to-do"); //save query for "#tasks-to-do" to a variable

var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);
