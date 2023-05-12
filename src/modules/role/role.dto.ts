import { PartialType } from "@nestjs/swagger";

export enum eRole {
    
}

export class RoleDtoCreate {
    name: string;
}

export class RoleDtoUpdate extends PartialType(RoleDtoCreate) {

}