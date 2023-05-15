import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Profile } from './profile.entity';
import { Photo } from "../photo/photo.entity";
import { Role } from "../role/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 50})
    password: string;
    
    @Column({default: false})
    isActive: boolean;

    /**
     * 一个用户只有一个配置
     */
    @OneToOne(()=>Profile, profile=>profile.user)
    @JoinColumn()
    profile:Profile;

    /**
     * 一个用户拥有多张照片
     */
    @OneToMany(() => Photo, photo=>photo.user)
    @JoinColumn({})
    photos: Photo[];

    @ManyToMany(()=>Role, role=>role.users)
    @JoinTable()
    roles: Role[];
}

