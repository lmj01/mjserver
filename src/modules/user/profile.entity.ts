import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from './user.entity';
import { eGender } from "./user.dto";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', default:eGender.unknown})
    gender: eGender;

    @Column({type: 'int', default: 0})
    age: number;

    @OneToOne(()=>User, user=>user.profile)
    user: User;
}
