export default class task{

    constructor(task_text, task_status="pending", task_date = null, id = null, assignedUsers = []){
        this.id= id !== null ? id : Date.now();
        this.task_text=task_text;
        this.task_status=task_status;
        this.task_date= task_date || this.getDate();
        this.assignedUsers = assignedUsers;
    }

    getDate(){
        const now=new Date();
        return now.toLocaleDateString("pl-PL");
    }

    setStatus(new_status){
        const status_types=["pending", "done"];

    if(status_types.includes(new_status)){
        this.task_status= new_status;
        }
    }

    assignUser(userName) {
        if (!this.assignedUsers.includes(userName)) {
            this.assignedUsers.push(userName);
        }
    }

    removeUser(userName) {
        this.assignedUsers = this.assignedUsers.filter(user => user !== userName);
    }

    set_Text(text){
        this.task_text=text;
    }
 }