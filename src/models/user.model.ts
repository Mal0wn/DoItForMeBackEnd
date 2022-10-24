import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Address } from "./address.model";
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

    @OneToMany(() => Mission, (mission) => mission.creator)
    missionCreated: Mission[];

    @OneToMany(() => Mission, (mission) => mission.maker)
    missionMade: Mission[];

    @OneToMany(() => Address, (address) => address.user)
    address: Address[];
}