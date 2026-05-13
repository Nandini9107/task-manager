let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Auto Login
if(localStorage.getItem("loggedIn")){
  showDashboard();
}

// Login Function
function login(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email === "admin@gmail.com" && password === "1234"){
    localStorage.setItem("loggedIn", true);
    showDashboard();
  }else{
    alert("Wrong credentials");
  }
}

// Logout
function logout(){
  localStorage.removeItem("loggedIn");
  location.reload();
}

// Show Dashboard
function showDashboard(){
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  displayTasks();
}

// Add Task
function addTask(){

  const taskInput = document.getElementById("taskInput");
  const statusInput = document.getElementById("statusInput");

  if(taskInput.value.trim() === ""){
    alert("Enter a task");
    return;
  }

  const task = {
    text: taskInput.value,
    status: statusInput.value
  };

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";

  displayTasks();
}

// Display Tasks
function displayTasks(){

  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  tasks.forEach((task,index)=>{

    taskList.innerHTML += `
      <div class="task ${task.status.toLowerCase()}">

        <h3>${task.text}</h3>

        <p>Status: ${task.status}</p>

        <div class="task-buttons">

          <button onclick="editTask(${index})">
            Edit
          </button>

          <button onclick="deleteTask(${index})">
            Delete
          </button>

        </div>

      </div>
    `;
  });
}

// Delete Task
function deleteTask(index){

  tasks.splice(index,1);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}

// Edit Task
function editTask(index){

  const newTask = prompt("Edit Task", tasks[index].text);

  if(newTask !== null){

    tasks[index].text = newTask;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
  }
}