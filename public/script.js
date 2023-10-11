// Class to represent Tasks
class Task {
    constructor(status, taskValue) {
        this.status = status;
        this.taskValue = taskValue;
    }
}


// *********** DOM Element Selector ***********
const addBtn = document.getElementById("add");
const inputTask = document.querySelector(".task");
const taskListDisplay = document.querySelector(".tasks");
const deleteAllBtn = document.querySelector(".deleteBtn");
const searchInput = document.querySelector(".search");

// Initializing taskList array from local storage or create an empty array
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

// event listeners
addBtn.addEventListener('click', addItem);
deleteAllBtn.addEventListener('click', delAll);
taskListDisplay.addEventListener('click', listClicked);
searchInput.addEventListener('input', filterSearch);

// Initial Display of Tasks
display(taskList);

// Function to add a new task to the list
function addItem(e) {
    e.preventDefault();
    const taskValue = inputTask.value.trim();
    if(!taskValue){
        return;// Prevent adding empty tasks
    }
    const newTask = new Task(false, taskValue);
    taskList.push(newTask);
    inputTask.value = "";// Clear input field
    saveTaskList(); // Save the updated taskList to local storage
    display(taskList); // Display the updated taskList
}

// Delete all entries in tasklist
function delAll(e) {
    e.preventDefault();
    taskList = []; // Clear the task list
    saveTaskList(); // Save the empty task list to local storage
    display(taskList); // Update the task list display
}

// Function to display tasks in the taskList provided
function display(taskList) {
    taskListDisplay.innerHTML = ""; // Clear the existing task list display
    let completedHTML = "";
    let incompleteHTML = "";
    taskList.forEach((task, i) => {
        if(task.status == true)
        {
            completedHTML += `<li class="task-item">
            <input id="${i}" class="checkbox" type="checkbox" checked/>
            <p class="taskContent checked">${task.taskValue}</p>
            <i id= "${i}" class="deleteItem fa fa-trash" aria-hidden="true"></i>
            </li>`;
        }else{
            incompleteHTML += `<li class="task-item">
            <input id="${i}" class="checkbox" type="checkbox"/>
            <p class="taskContent">${task.taskValue}</p>
            <i id= "${i}" class="deleteItem fa fa-trash" aria-hidden="true"></i>
            </li>`;
        }
    });
    taskListDisplay.innerHTML = incompleteHTML + completedHTML; // update the tasklist display
}

// Function to handle clicks within the task list
function listClicked(e) {
    e.preventDefault();
    const targetElement = e.target;
    if (targetElement.classList.contains('deleteItem')) {
        delItem(targetElement.id);//delete the clicked item
    }else if(targetElement.classList.contains('checkbox')){
        taskList[targetElement.id].status = targetElement.checked; // update the task status
    }
    saveTaskList(); // Save the updated task list to local storage
    display(taskList); // Update the task list display
}

// Function to delete a specific index element
function delItem(index) {
    taskList.splice(index, 1);
}

// Function to display filtered List
function filterSearch(e){
    e.preventDefault();
    let checkValue = e.target.value; // value in the search input
    // filter the tasks from taskList
    const filteredTasks = taskList.filter((task)=>task.taskValue.includes(checkValue));
    // Display the filtered tasks
    display(filteredTasks);
}

// Function to save the task list to local storage
function saveTaskList(){
    localStorage.setItem("taskList",JSON.stringify(taskList));
}