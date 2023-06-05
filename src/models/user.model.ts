import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm"
import { Address } from "./address.model";
import { Message } from "./message.model";
import { Mission } from "./mission.model";

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

    @OneToMany(() => Mission, (mission) => mission.creator, {cascade: true, onDelete: "CASCADE"})
    missionCreated: Mission[];

    @OneToMany(() => Mission, (mission) => mission.maker)
    missionMade: Mission[];

    @OneToMany(() => Address, (address) => address.user, {cascade: true, onDelete: "CASCADE"})
    address: Address[];

    @OneToMany(() => Message, (message) => message.receiver)
    received: Message[];

    @OneToMany(() => Message, (message) => message.sender)
    sent: Message[];
}