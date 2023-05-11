import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { User } from "../user/user.entity";

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

    @Column()
    userId: number;

    // @ManyToOne(()=>User, (user)=>user.photos)
    // @JoinColumn({name: 'user_id'})
    // user: User;
}

@Entity()
export class PhotoMeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'int', default: 0})
    width: number;

    @Column({type:'int', default: 0})
    height: number;

    @Column({nullable:true})
    orientation:string;

    @Column({default:true})
    compressed:boolean;

    @Column({default: ''})
    comment:string;

    @OneToOne(()=>Photo)
    @JoinColumn()
    photo: Photo;

}