var formEl = document.querySelector("#task-form"); //stores query for form in formEl
var tasksToDoEl = document.querySelector("#tasks-to-do"); //save query for "#tasks-to-do" to a variable
var taskIdCounter = 0; //variable to store unique IDs for each task
var pageContentEl = document.querySelector("#page-content");

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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl); //append child of "div.task-info" to "li"

    var taskActionsEl = createTaskActions(taskIdCounter); //store value from taskIdCounter
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl); //append child of "li" to "ul"

    //increase task counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div"); //create element "div"
    actionContainerEl.className = "task-actions"; // assign class to "div"

    //create edit button
    var editButtonEl = document.createElement("button"); //create element "button"
    editButtonEl.textContent = "Edit"; //set element "button" to have text "Edit"
    editButtonEl.className = "btn edit-btn"; //set element "button" to have class "btn edit-btn"
    editButtonEl.setAttribute("data-task-id", taskId); //set attribute "data-task-id" for "button" using taskId as the index

    actionContainerEl.appendChild(editButtonEl); //add "button" element as child to "div"

    //create delete button
    var deleteButtonEl = document.createElement("button"); // create element "button"
    deleteButtonEl.textContent = "Delete"; //set element "button" to have text "Delete"
    deleteButtonEl.className = "btn delete-btn";//set element "button" to have class "btn delete-btn"
    deleteButtonEl.setAttribute("data-task-id", taskId);//set attribute "data-task-id" for "button" using taskId as the index

    actionContainerEl.appendChild(deleteButtonEl); //add "button" element as child to "div"

    var statusSelectEl = document.createElement("select"); //create element "select"
    statusSelectEl.className = "select-status"; //set element "select" to have class "select-status"
    statusSelectEl.setAttribute("name", "status-change"); //set attribute "name" to "status-change"
    statusSelectEl.setAttribute("data-task-id", taskId); //set attribute "data-task-id" to "taskId"
    actionContainerEl.appendChild(statusSelectEl); //append child "select" to "div"

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++){
        // create option element
        var statusOptionEl = document.createElement("option"); //create element "option"
        statusOptionEl.textContent = statusChoices[i]; //assign textContent to element "option". This value is pulled from the array statusChoices
        statusOptionEl.setAttribute("value", statusChoices[i]); //assign statusChoices to the "value" of "option"

        //append to select
        statusSelectEl.appendChild(statusOptionEl); //append as a child to "option"
    }
    return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler) //this allows the event listener to respond to the "submit" button being clicked, or the "Enter Key" being clicked

var taskButtonHandler = function(event){
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches(".edit-btn")){//if the click event has a class of ".edit-btn", do this:
        var taskId = targetEl.getAttribute("data-task-id"); // store attribute of "data-task-id" to variable
        editTask(taskId); //perform function passing over the "taskId" value
    }

    //delete button was clicked
    if (targetEl.matches(".delete-btn")) { //if the click event has a class of ".delete-btn", do this:
    //get the element's task id
    var taskId = event.target.getAttribute("data-task-id"); //store attribute of "data-task-id" to variable
    deleteTask(taskId); //perform function passing over the "taskId" value
    }
}
//function handle the editing of a task
var editTask = function(taskId){
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    //get content from task type
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    //show text in form so as to edit
    document.querySelector("input[name='task-name']").value = taskName; //update the "input" element to show a value from "taskName"
    document.querySelector("select[name='task-type']").value = taskType; //update the "select" element to show a value from "taskType"
    document.querySelector("#save-task").textContent = "Save Task"; //update "#save-task" button to show textContent "Save Task"

    //set ID for element to be edited
    formEl.setAttribute("data-task-id", taskId);
}

//function handles the deletion of a task
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); //locate an element with the class of ".task-item" and a "data-task-id" that matches the "taskId" and save it to a variable
    taskSelected.remove();
}
pageContentEl.addEventListener("click", taskButtonHandler);