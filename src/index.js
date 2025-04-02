import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './index.html';
import './tasks.js';
import taskmanager from './taskmanager.js';
import user from './user.js';

const taskManager = new taskmanager;
const users = new user;
const tasklist = document.getElementById("tasklist");
const taskinput = document.getElementById("taskinput");
const taskbtn = document.getElementById("taskbtn");
const userinput = document.getElementById("userinput");
const userbtn = document.getElementById("userbtn");
const userlist = document.getElementById("userlist");
const filterselect = document.getElementById("filter");

const storedTasks = JSON.parse(localStorage.getItem("tasks"));
const storedUsers = JSON.parse(localStorage.getItem("users"));

if (storedTasks) {
    storedTasks.forEach(task => taskManager.addTask(task.task_text, task.task_status, task.task_date, task.assignedUsers));
}
if (storedUsers) {
    storedUsers.forEach(user => users.addUser(user.name));
}

renderTasks();
renderUsers();

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskManager.getTasks()));
    localStorage.setItem("users", JSON.stringify(users.getUsers()));
}

taskbtn.addEventListener("click", ()=>{
    const taskName = taskinput.value.trim();
    if(taskName){
        taskManager.addTask(taskName);
        taskinput.value = "";
        saveToLocalStorage();
        renderTasks();
    }}

);

userbtn.addEventListener("click", ()=>{
    const userName = userinput.value.trim();
    if(userName){
        users.addUser(userName);
        userinput.value = "";
        saveToLocalStorage();
        renderUsers();
    }
}

);

filterselect.addEventListener("change", ()=>{
    renderTasks(filterselect.value);
}

);


function renderTasks(filter = "all"){
    tasklist.innerHTML = "";
    let tasks = filter === "all" ? taskManager.getTasks() : taskManager.filterTasks(filter);

    tasks.forEach(element => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div style="border: 1px solid black">${element.task_text} - ${element.task_status} - <i>${element.task_date}</i>
        <br>task id: ${element.id}<br>
        <select id="statusselect${element.id}"><option value="pending">pending</option><option value="done">done</option></select>
        <button onclick="updatestat(${element.id})">status update</button>
        <button onclick="edit(${element.id})">edit</button>
        <button onclick="remove(${element.id})">delete</button>
        </div>
        <span>Assigned:</span>
        <ul class="assigned"></ul>
        `;

        li.classList.add("droppable");

        li.addEventListener("dragover", (event)=>{
            event.preventDefault();
        })

        li.addEventListener("drop", (event)=>{
            event.preventDefault();
            const userName = event.dataTransfer.getData("text");
      
            if (!element.assignedUsers.includes(userName)) {
              element.assignedUsers.push(userName);
              saveToLocalStorage();
              renderTasks();
            }

        });

        const assignedUsersList = li.querySelector(".assigned");
        element.assignedUsers.forEach(userName => {
          const userLi = document.createElement("li");
          userLi.textContent = userName;
          userLi.setAttribute("draggable", "true");


          userLi.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("removeUser", userName);
            event.dataTransfer.setData("taskName", element.task_text);
          });
    
          assignedUsersList.appendChild(userLi);
        });

        tasklist.appendChild(li);
        });
    }

    function renderUsers(){
        userlist.innerHTML="";
        users.getUsers().forEach(element => {
            const li = document.createElement("li");
            li.innerHTML = element.name;
            li.setAttribute("dragable", "true");

            li.addEventListener("dragstart", (event)=> {
                event.dataTransfer.setData("text", element.name);
            });
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "delete";
            deleteBtn.addEventListener("click", ()=>{
                users.deleteUser(element.id);
                saveToLocalStorage();
                renderUsers();
            });

            li.appendChild(deleteBtn);
        
            userlist.appendChild(li);
        });
    }

    window.updatestat = (id) =>{
        const Status = document.getElementById(`statusselect${id}`).value;
        taskManager.updateStatus(id, Status);
        saveToLocalStorage();
        renderTasks();
    };
        
    window.edit = (id) =>{
        const newText = prompt("new task name");
        taskManager.setText(id, newText);
        saveToLocalStorage();
        renderTasks();
    };

    window.remove = (id) =>{
        taskManager.deleteTask(id);
        saveToLocalStorage();
        renderTasks();
    };

    document.body.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

    document.body.addEventListener("drop", (event) => {
        const userName = event.dataTransfer.getData("removeUser");
        const taskName = event.dataTransfer.getData("taskName");
        if (userName && taskName) {
        const task = taskManager.getTasks().find(task => task.task_text === taskName);
          if (task) {
            task.assignedUsers = task.assignedUsers.filter(user => user !== userName);
            saveToLocalStorage();
            renderTasks();
          }
        }
      });