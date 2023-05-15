import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/modules/user/user.entity";
import { Permission } from "../permission/permission.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    description: string;

    @ManyToMany(()=>User, (user)=>user.roles)
    users: User[];

    /**
     * @JoinTable()是ManyToMany必须的，就是新建一张表
     */
    @ManyToMany(()=>Permission, permission=>permission.roles)
    @JoinTable()
    permissions: Permission[];
}