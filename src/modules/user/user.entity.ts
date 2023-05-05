import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Role } from "src/modules/role/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 50})
    password: string;

    @Column('int')
    age: number;

    @Column({default: false})
    isActive: boolean;
    
    /**
     * 一个用户对应一个角色
     */
    @ManyToOne(()=>Role, (role)=>role.user)
    @JoinColumn({name: 'roleId'})
    role: Role;
}