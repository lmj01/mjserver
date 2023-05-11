import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Profile } from './profile.entity';

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

    @OneToOne(()=>Profile, profile=>profile.user)
    @JoinColumn()
    profile:Profile;
}

