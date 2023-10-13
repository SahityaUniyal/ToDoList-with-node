const start = async () => {

}

start();


// *********** DOM Element Selector ***********
const addBtn = document.getElementById("add");
const inputTask = document.querySelector(".task");
const tasksDisplay = document.querySelector(".tasks");
const deleteAllBtn = document.querySelector(".deleteBtn");
const searchInput = document.querySelector(".search");


// Function to display tasks
const showTasks = async (url = '/api/v1/tasks') => {
    tasksDisplay.innerHTML = ""; // Clear the existing task list display
    let completedHTML = "";
    let incompleteHTML = "";
    try {
        const { data: { tasks } } = await axios.get(url);
        tasks.forEach((task, i) => {
            if (task.completed == true) {
                completedHTML += `<li class="task-item">
                <input id="${task._id}" class="checkbox" type="checkbox" checked/>
                <p id="${task._id}" class="taskContent checked">${task.name}</p>
                <i id="${task._id}" class="fa fa-pencil-square edit-task" aria-hidden="true"></i>
                <i id="${task._id}" class="deleteItem fa fa-trash" aria-hidden="true"></i>
                </li>`;
            } else {
                incompleteHTML += `<li class="task-item">
                <input id="${task._id}" class="checkbox" type="checkbox"/>
                <p id="${task._id}" class="taskContent">${task.name}</p>
                <i id="${task._id}" class="fa fa-pencil-square edit-task" aria-hidden="true"></i>
                <i id="${task._id}" class="deleteItem fa fa-trash" aria-hidden="true"></i>
                </li>`;
            }
        });
        tasksDisplay.innerHTML = incompleteHTML + completedHTML; // update the tasks display
    }
    catch (error) {
        console.log(error);
    }

}

showTasks();

// event listeners
// Create new task
addBtn.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        const newTaskValue = inputTask.value.trim();
        const { data: { task } } = await axios.post('/api/v1/tasks', { name: newTaskValue });
        inputTask.value = "";// Clear input field
        showTasks();
    } catch (error) {
        console.log(error);
    }
});
// Delete All Tasks
deleteAllBtn.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        await axios.delete('/api/v1/tasks');
        showTasks();
    }
    catch (error) {
        console.log(error);
    }
});
// Delete Particular Task
tasksDisplay.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        const targetElement = e.target;
        if (targetElement.classList.contains('deleteItem')) {
            await axios.delete(`/api/v1/tasks/${targetElement.id}`);
            showTasks();
        }
    } catch (error) {
        console.log(error);
    }
});
// Filter function
searchInput.addEventListener('input', async (e) => {
    e.preventDefault();
    showTasks(`/api/v1/tasks?name=${e.target.value}`);
});

// Changing Completed Status
tasksDisplay.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        const targetElement = e.target;
        if (targetElement.classList.contains('checkbox')) {
            // update the task status
            await axios.patch(`/api/v1/tasks/${targetElement.id}`, { completed: targetElement.checked });
            showTasks();
        }
    } catch (error) {
        console.log(error);
    }
});

// Edit Task
const editTaskName = async (id, value) => {
    try {
        if (value === "") {
            throw Error('Task value cannot be empty');
        }
        const task = await axios.patch(`/api/v1/tasks/${id}`, { name: value });
        showTasks();
    } catch (error) {
        console.log(error);
    }
}
tasksDisplay.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("fa-check-square")) {
        // Switch to icon from save to edit
        e.target.classList.remove('fa-check-square');
        e.target.classList.add("fa-pencil-square");
        const editTask = document.querySelector(`input[id='${e.target.id}'][class="taskContent"]`);
        editTaskName(editTask.id, editTask.value);
    }
    else if (e.target.classList.contains("edit-task")) {
        const editTaskID = e.target.id;
        // Switch icon from edit to save
        e.target.classList.remove("fa-pencil-square");
        e.target.classList.add('fa-check-square');
        // getting the task to be edited
        const editTask = document.querySelector(`p[id='${editTaskID}']`);
        // Element that will take edit input
        let a = document.createElement('input');
        a.classList = editTask.classList;
        a.id = editTaskID;
        a.value = editTask.innerHTML;
        // replacing paragraph task with input field to edit
        editTask.parentNode.replaceChild(a, editTask);
        a.focus();
        // If focus on edit is lost we change the task value
        a.addEventListener('blur', (e) => { editTaskName(e.target.id, e.target.value) });
    }
})