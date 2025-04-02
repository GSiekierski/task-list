export default class user{
    constructor(name){
        this.id = Date.now()+55206;
        this.name=name;
        this.users=[];
    }

    addUser(name){
        const newUser=new user(name);
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