import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstname: string;

    @Column({ length: 50 })
    lastname: string;

    @Column({ length: 250 })
    email: string;

    @Column({length: 250 })
    password: string;

    @Column({ length: 250, nullable: true })
    picture: string;

    @Column()
    birthday: Date;

    @Column({ length: 20})
    role: string;

    @Column()
    phone: number;
}