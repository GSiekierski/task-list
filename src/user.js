export default class user{
    constructor(name, id = null){
        this.id = id !== null ? id : Date.now()+55206;
        this.name=name;
        this.users=[];
    }

    addUser(name, id=null){
        const newUser=new user(name, id);
        this.users.push(newUser);
        return newUser;
    }

    deleteUser(id){
        this.users=this.users.filter(user => user.id !==id);
    }

    getUsers(){
        return this.users;
    }
}