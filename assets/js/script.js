var formEl = document.querySelector("#task-form"); //stores query for form in formEl
var tasksToDoEl = document.querySelector("#tasks-to-do"); //save query for "#tasks-to-do" to a variable

var createTaskHandler = function() {
    event.preventDefault(); //prevents the browser from refreshing after button click
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create list item
    var listItemEl = document.createElement("li"); //stores the ability to create "li" in a variable
    listItemEl.className = "task-item"; // stores a new class name for each element stored in listItemEl

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
    listItemEl.appendChild(taskInfoEl); //append child of "div.task-info" to "li"
    
    tasksToDoEl.appendChild(listItemEl); //append child of "li" to "ul"
}

formEl.addEventListener("submit", createTaskHandler) //this allows the event listener to respond to the "submit" button being clicked, or the "Enter Key" being clicked
