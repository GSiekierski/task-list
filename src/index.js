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
const filterselect = document.getElementById("filter");

taskbtn.addEventListener("click", ()=>{
    const taskName = taskinput.value.trim();
    if(taskName){
        taskManager.addTask(taskName);
        taskinput.value = "";
        renderTasks();
    }}

);

userbtn.addEventListener("click", ()=>{
    const userName = userinput.value.trim();
    if(userName){
        users.addUser(userName);
        userinput.value = "";
        renderTasks();
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
        `;
        tasklist.appendChild(li);
        });
    }
    window.updatestat = (id) =>{
        const Status = document.getElementById(`statusselect${id}`).value;
        taskManager.updateStatus(id, Status);
        renderTasks();
    };
        
    window.edit = (id) =>{
        const newText = prompt("new task name");
        taskManager.setText(id, newText);
        renderTasks();
    };

    window.remove = (id) =>{
        taskManager.deleteTask(id);
        renderTasks();
    };