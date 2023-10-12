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
                <p class="taskContent checked">${task.name}</p>
                <i id="${task._id}" class="fa fa-pencil-square edit-task" aria-hidden="true"></i>
                <i id="${task._id}" class="deleteItem fa fa-trash" aria-hidden="true"></i>
                </li>`;
            } else {
                incompleteHTML += `<li class="task-item">
                <input id="${task._id}" class="checkbox" type="checkbox"/>
                <p class="taskContent">${task.name}</p>
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
tasksDisplay.addEventListener('click', async (e) => {
    if (e.target.classList.contains("edit-task")) {
        console.log(e.target);
    }
})