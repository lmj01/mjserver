import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    createTime: Date;

    @Column()
    updateTime: Date;

    @Column({default:false})
    isPublished: boolean;

    @Column({default:0})
    views: number; // 浏览计数

    @Column()
    isDelete: boolean;
}