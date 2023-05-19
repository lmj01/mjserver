import { PartialType } from "@nestjs/swagger";

export enum ePermission {
    None = 0,

    // 入口权限，就是那些可被看见
    Entry = 1 << 0,
    
    // 操作权限
    Manipulate_Query = 1 << 1,
    Manipulate_Add = 1 << 2,
    Manipulate_Update = 1 << 3,
    Manipulate_Remove = 1 << 4,
    Manipulate_ALL = Manipulate_Query | Manipulate_Add | Manipulate_Update | Manipulate_Remove,

    // 数据可见性
    Data_Invisible = 1 << 5,
    Data_Visible = 1 << 6,
    Data_Modify = 1 << 7,
    Data_Remove = 1 << 8,
}

export class PermissionDtoCreate {}


export class PermissionDtoUpdate extends PartialType(PermissionDtoCreate) {}