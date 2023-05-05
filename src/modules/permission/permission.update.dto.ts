import { PermissionDtoCreate } from "./permission.create.dto";
import { PartialType } from "@nestjs/swagger";

export class PermissionDtoUpdate extends PartialType(PermissionDtoCreate) {}