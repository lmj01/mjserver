import { RoleDtoCreate } from "./role.create.dto";
import { PartialType } from "@nestjs/swagger";

export class RoleDtoUpdate extends PartialType(RoleDtoCreate) {

}