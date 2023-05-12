import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/modules/user/user.entity";
import { Permission } from "../permission/permission.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>User, (user)=>user.role)
    @JoinColumn({name: 'userId'})
    user: User[];

    /**
     * @JoinTable()是ManyToMany必须的，就是新建一张表
     */
    @ManyToMany(()=>Permission)
    @JoinTable()
    permissions: Permission[];
}