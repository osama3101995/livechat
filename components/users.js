

class Users{

     users = []

     addUser = (userData) => {
        let name = userData.name.trim().toLowerCase();
        let room = userData.room.trim().toLowerCase();
    
        const existingUser = this.users.find( user => user.name === name  &&  room.name === room );
        if(existingUser){
            return {errorTrue : true, message: "User Is Taken"};
        }
    
        const user = userData
    
        this.users.push(user)
    
        return user
    
    }
    
     removeUser = (id) => {
        const index = this.users.findIndex(user => user.id === id);
        if(index !== -1){
            this.users.splice(index, 1)[0]
        }
    }
    
     getUser = (id) => this.users.find(user => user.id === id);
    
     getUsersInRoom = () => this.users.find( user => user.room === room );
    
}

const userService = new Users();
module.exports = userService;