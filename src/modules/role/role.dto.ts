import { PartialType } from "@nestjs/swagger";

export class RoleDtoCreate {
    name: string;
}

export class RoleDtoUpdate extends PartialType(RoleDtoCreate) {

}