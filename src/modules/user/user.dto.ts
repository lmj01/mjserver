import { eRole } from "../role/role.dto";

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
    role: eRole;
}

/**
 * 用于查询的
 */
export class UserDto {
    id: number;
    name: string;
}