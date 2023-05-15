import { PartialType } from "@nestjs/swagger";

export enum eRole {
    USER = 'User',
    VIP1 = 'Vip1',
    VIP2 = 'Vip2',
    ADMIN = 'admin',
}

export class RoleDtoCreate {
    name: string;
    description: string;
}

export class RoleDtoUpdate extends PartialType(RoleDtoCreate) {
    id: number;
}