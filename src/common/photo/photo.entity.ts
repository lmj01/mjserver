import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { User } from "../user/user.entity";
import { Meta } from "./meta.entity";

/**
 * 每个user可以有多张photo
 * 每个photo必属于一个user
 */

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({nullable:true})
    name: string;

    @Column({nullable:true})
    description: string;

    @Column({default:0})
    views:number;

    @Column({default:false})
    isPublished:boolean;

    @OneToOne(()=>Meta, meta=>meta.photo)
    @JoinColumn()
    meta: Meta;

    @ManyToOne(()=>User, user=>user.photos)
    user: User;
}

