import { UserDto } from "src/dto/User";

export class UserService {
    async getUserById(userId:string):Promise<UserDto> {
        const demoData: UserDto[] = [
            {
                userId: 'mj201',
                userName: 'meijie',
                age: 10,
            },
            {
                userId: 'mj202',
                userName: 'Gray',
                age: 11,
            },
        ]
        return demoData.filter(e=>e.userId==userId)[0];
    }
}