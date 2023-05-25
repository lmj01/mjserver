export enum eGender {
	male = 'male',
	femal = 'female',
	unknown = 'unknown',
}

export class GenderDto {
	name: string;
}

export class UserDtoCreate {
	name: string;
	password: string;
	age: number;
	gender: eGender;
	idRole: number;
	idPermission: number;
}

/**
 * 用于查询的
 */
export class UserDto {
	id: number;
	name: string;
}
