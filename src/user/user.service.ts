import { User } from "src/user/User";


export class UserService {
    users:User[];
    constructor() {
        this.users = [
            {
                userId: 1,
                name: 'meijie',
                password: 'changeme',
                age: 10,
            },
            {
                userId: 2,
                name: 'Gray',
                password: 'guess',
                age: 11,
            },
        ]
    }
    async getUserById(userId:number):Promise<User> {        
        return this.users.find(e=>e.userId==userId);
    }
    async findOne(username: string): Promise<User> {
        return this.users.find(e => e.name === username);
    }
}