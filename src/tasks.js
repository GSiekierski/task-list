export default class task{

    constructor(task_text, task_status="pending"){
        this.id=Date.now();
        this.task_text=task_text;
        this.task_status=task_status;
        this.task_date=this.getDate();
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

    set_Text(text){
        this.task_text=text;
    }
 }