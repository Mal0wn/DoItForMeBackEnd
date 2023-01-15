import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Address } from "./address.model";
import { Message } from "./message.model";
import { User } from "./user.model";

@Entity()
export class Mission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 , nullable : true})
    picture: string;

    @Column({ length: 50 })
    status: string;

    @Column()
    price: number;

	@Column({ length: 50 })
    title: string;

	@Column({ length: 250 })
    description: string;

	@CreateDateColumn()
    creation_date: Date;

	@Column()
    id_create: number;

<<<<<<< HEAD
	@Column({ nullable: true })
=======
	@Column({nullable : true})
>>>>>>> 760e5db33d7017cada3ec3fba29f121da910da6b
    id_make: number;

    @ManyToOne(() => User, (user) => user.missionCreated)
    @JoinColumn({ name: "id_create" })
    creator: User;

    @ManyToOne(() => User, (user) => user.missionMade)
    @JoinColumn({ name: "id_make" })
    maker: User;

    @OneToOne(() => Address, (address) => address.mission)
    address: Address;
    
    @OneToMany(() => Message, (message) => message.mission)
    messages: Message[];
}