import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
// import { User } from "src/modules/user/user.entity";
// import { Permission } from "../permission/permission.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    /**
     * user <-> role 一对多
     * 一个角色对应多个用户
     */
    // @OneToMany(()=>User, (user)=>user.role)
    // @JoinColumn({name: 'userId'})
    // user: User;

    // @ManyToMany(()=>Permission)
    // @JoinTable()
    // permissions: Permission[];
}