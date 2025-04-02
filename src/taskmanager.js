import task from "./tasks.js";

export default class taskmanager extends task{
    constructor(){
        super();
        this.tasks=[];
    }

    addTask(text){
        const newTask=new task(text);
        this.tasks.push(newTask);
        return newTask;
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