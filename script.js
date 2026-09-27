
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.querySelector(".input-area input");
const addButton = document.querySelector(".input-area button");
const taskList = document.querySelector("#taskList");
const taskCounter = document.querySelector("#taskCounter");
const clearAllButton = document.querySelector("#clearAllButton");


function createTask(task, index) {

    const newTask = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    if(task.completed){
        taskSpan.classList.add("completed");
    }

    taskSpan.addEventListener("click", function() {
        task.completed = !task.completed;
        taskSpan.classList.toggle("completed");
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateCounter();
    });

    
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");

   editButton.addEventListener("click", function() {

    const newText = prompt("Edit your task: ", taskSpan.textContent);

    if(newText !== null && newText.trim() !== "") {

        tasks[index].text = newText.trim();

        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks();

    }

});

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

   deleteButton.addEventListener("click", function() {

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();

    updateCounter();

});

    newTask.appendChild(taskSpan);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);
}

function updateCounter() {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    }).length;

    taskCounter.textContent = totalTasks + " tasks | " + completedTasks + " completed";
}


addButton.addEventListener("click", function() {
   
    const taskText = taskInput.value.trim();

   if (taskText === ""){
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });


    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(tasks[tasks.length - 1], tasks.length -1);

    taskInput.value = "";
    updateCounter();

    });

    function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        createTask(task, index);
    });

}


renderTasks();

taskInput.addEventListener("keydown", function(event) {

    if(event.key === "Enter") {
        addButton.click();
    }
});

clearAllButton.addEventListener("click", function() {

    tasks = [];

    taskList.innerHTML = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));

    updateCounter();
});


updateCounter();