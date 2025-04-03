import task from "./tasks.js";

export default class taskmanager extends task{
    constructor(){
        super();
        this.tasks=[];
    }

    addTask(task_text, task_status = "pending", task_date = null, id = null, assignedUsers = []){
        const newTask=new task(task_text, task_status, task_date, id, assignedUsers);
        this.tasks.push(newTask);
        return newTask;
    }


    assignUserToTask(taskId, userName) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task && isNaN(userName) && !task.assignedUsers.includes(userName)) {
            task.assignUser.push(userName);
        }
    }

    removeUserFromTask(taskId, userName) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.assignedUsers = task.assignedUsers.filter(user => user !== userName);
        }
    }

    deleteTask(id){
        this.tasks=this.tasks.filter(task => task.id !==id);
    }

    setText(id, text){
        const task=this.tasks.find(task => task.id === id);
        if(task){
            task.set_Text(text);
        }
    }

    updateStatus(id, newStatus){
        const task=this.tasks.find(task => task.id === id);
        if(task){
            task.setStatus(newStatus);
        }
    }

    filterTasks(status){
        return this.tasks.filter(task => task.task_status === status);
    }

    getTasks(){
        return this.tasks;
    }
}