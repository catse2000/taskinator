var formEl = document.querySelector("#task-form"); //stores query for form in formEl
var tasksToDoEl = document.querySelector("#tasks-to-do"); //save query for "#tasks-to-do" to a variable

var createTaskHandler = function() {
    event.preventDefault(); //prevents the browser from refreshing after button click
    var listItemEl = document.createElement("li"); //stores the ability to create "li" in a variable
    listItemEl.className = "task-item"; // stores a new class name for each element stored in listItemEl
    listItemEl.textContent = "This is a new task."; //assigns a new text content to the element stored in listItemEl
    tasksToDoEl.appendChild(listItemEl); //searchs for the element stored in tasksToDoEl and children elements of what is stored in listItemEl
}

formEl.addEventListener("submit", createTaskHandler) //this allows the event listener to respond to the "submit" button being clicked, or the "Enter Key" being clicked
