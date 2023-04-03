import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm"
import { Mission } from "./mission.model";
import { User } from "./user.model";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @Column({ length: 250 })
    street: string;

    @Column({ length: 10 })
    zip_code: string;

	@Column({ length: 60 })
    city: string;

	@Column({ length: 60 })
    country: string;

	@Column({ length: 250, nullable: true })
    complement: string;

    @Column({ type: 'decimal', precision: 10, scale: 6 })// difference de 2.6cm par 0.000001 degrés
    latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 6 })
    longitude: number

    @Column({ nullable: true})
    id_user: number;

    @ManyToOne(() => User, (user) => user.address)
    @JoinColumn({ name: "id_user" })
    user: User;

    @Column({ nullable: true})
    id_mission: number;
    
    @OneToOne(() => Mission, (mission) => mission.address)
    @JoinColumn({ name: "id_mission"})
    mission: User;
}