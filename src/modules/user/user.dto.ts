export enum eGender {
    male = 'male',
    femal = 'female',
    unknown = 'unknown',
}
export class UserDtoCreate {
    name: string;
    password: string;
    age: number;
    gender:eGender;
}
