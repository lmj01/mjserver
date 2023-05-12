import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Photo } from "./photo.entity";

@Entity()
export class Meta {
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

    @OneToOne(()=>Photo, photo=>photo.meta)
    photo: Photo;
}