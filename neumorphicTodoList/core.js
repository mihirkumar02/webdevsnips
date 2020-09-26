var tasksHolder = document.getElementById("tasks-holder");

function addTask(){
    var task = document.getElementById('new-task').value;
    
    if(task){        
        var newTask = document.createElement("div");
        newTask.classList.add("task");
newTask.innerHTML = "<div><h3>" + task + "</h3></div>";

    var removeButtonHolder = document.createElement("div");

        var removeButton = document.createElement("button");
        removeButton.classList.add("remove-task");
        removeButton.innerHTML = "X";
        removeButton.id = task;
        removeButton.addEventListener('click', () => this.deleteTask(newTask));
        removeButtonHolder.appendChild(removeButton);

        newTask.appendChild(removeButtonHolder);
        tasksHolder.appendChild(newTask);

        document.getElementById('new-task').value = "";
    } else {
        window.alert("Please enter a task..");
    }
}

function deleteTask(removeThisTask){
    tasksHolder.removeChild(removeThisTask);
}