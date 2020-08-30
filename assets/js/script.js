var formEl = document.querySelector("#task-form"); //stores query for form in formEl
var tasksToDoEl = document.querySelector("#tasks-to-do"); //save query for "#tasks-to-do" to a variable (ul)
var taskIdCounter = 0; //variable to store unique IDs for each task
var pageContentEl = document.querySelector("#page-content"); //main
var tasksInProgressEl = document.querySelector("#tasks-in-progress"); //ul
var tasksCompletedEl = document.querySelector("#tasks-completed"); //ul
var tasks = []; //variable to contain task data to be stored in localStorage

// handles tasks from from
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

    var isEdit = formEl.hasAttribute("data-task-id"); //stores false/true of "data-task-id" attribute from form (in other words, does formEL have an attribute of data-task-id?)
    
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit){ //if isEdit is true
        var taskId = formEl.getAttribute("data-task-id"); //get the stored attribute of "data-task-id" in the form and store in taskId
        completeEditTask(taskNameInput, taskTypeInput, taskId); //call function completeEditTask() and pass three variables (Task Name, Taske Type, and Task ID);
    }
    //no data attribute, so create object as normal and pass to createTaskEl function
    else{
        //package up data as an object
        var taskDataObj = {
            name: taskNameInput, 
            type: taskTypeInput,
            status: "to do"
        };
    
        // send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }

}

// creates tasks
var createTaskEl = function(taskDataObj){
    // create list item
    var listItemEl = document.createElement("li"); //stores the ability to create "li" in a variable
    listItemEl.className = "task-item"; // stores a new class name for each element stored in listItemEl

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //add draggable feature
    listItemEl.setAttribute("draggable", "true");

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl); //append child of "div.task-info" to "li"

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    console.log(taskDataObj);

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

var completeEditTask = function(taskName, taskType, taskId){
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for (var i = 0; tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    alert("Task Updated!");

    formEl.removeAttribute("data-task-id"); //remove data-task-id attribute so there's no confusion when creating new tasks
    document.querySelector("#save-task").textContent = "Add Task"; //change textContent of #save-task button to "Add Task"
};

//function handles the deletion of a task
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); //locate an element with the class of ".task-item" and a "data-task-id" that matches the "taskId" and save it to a variable
    taskSelected.remove();

    // create new array to hold updated lists of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++){
        //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks arrray to be the same as updatedTaskArr
    tasks = updatedTaskArr;
};

//function handles the change of the type of task
var taskStatusChangeHandler = function (event){
    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if(statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }
    else if(statusValue == "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if(statusValue == "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }

    //update tasks in tasks array
    for (var i = 0; i < tasks.length; i++){
        if (tasks[id] === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    }
};

//handler for dragging tasks
var dragTaskHandler = function(){
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId); //store data in dataTransfer property in drag event
    var getId = event.dataTransfer.getData("text/plain");
};

//handler for identify the drop zone and preventing default with "dragover"
var dropZoneDragHandler = function(event){
    var taskListEl = event.target.closest(".task-list"); //look for element that is a child of, or is the target
    if (taskListEl) {
        event.preventDefault(); //prevent "dragover" default
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style:dashed;"); //change style of list when element is dragged over it
    }
}

//handler for dropping the task into a new area
var dropTaskHandler = function(event){
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;

    //set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    
    if (statusType === "tasks-to-do"){
        statusSelectEl.selectedIndex = 0;
    }
    else if(statusType === "tasks-in-progress"){
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed"){
        statusSelectEl.selectedIndex = 2;
    }

    dropZoneEl.removeAttribute("style"); //remove styling added in dropZoneDragHandler once item has been dropped
    dropZoneEl.appendChild(draggableElement);
};

//handles actions when dragging an object is done
var dragLeaveHandler = function(event){
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
};

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);