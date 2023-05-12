import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
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

    @Column({nullable:true})
    create: Date;

    @Column({nullable:true})
    update: Date;

    @Column({default:false})
    isDelete: boolean;

    /**
     * 一个用户一个配置
     * @JoinColumn()只在关系的一侧且拥有主键的表上
     */
    @OneToOne(()=>User, user=>user.profile)    
    user: User;
}
