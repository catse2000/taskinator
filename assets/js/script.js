var formEl = document.querySelector("#task-form"); //stores query for form in formEl
var tasksToDoEl = document.querySelector("#tasks-to-do"); //save query for "#tasks-to-do" to a variable

var taskFormHandler = function() {
    event.preventDefault(); //prevents the browser from refreshing after button click
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset(); //resets the form after submission

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput, 
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj){
    // create list item
    var listItemEl = document.createElement("li"); //stores the ability to create "li" in a variable
    listItemEl.className = "task-item"; // stores a new class name for each element stored in listItemEl

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl); //append child of "div.task-info" to "li"

    tasksToDoEl.appendChild(listItemEl); //append child of "li" to "ul"
}

formEl.addEventListener("submit", taskFormHandler) //this allows the event listener to respond to the "submit" button being clicked, or the "Enter Key" being clicked
