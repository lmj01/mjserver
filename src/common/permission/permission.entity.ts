import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Role } from "../role/role.entity";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'bigint'})
    code: number;

    @Column({nullable:true})
    description: string;

    @ManyToMany(()=>Role, role=>role.permissions)
    roles: Role[];
}