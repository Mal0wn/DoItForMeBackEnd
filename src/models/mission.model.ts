import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm"
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

	@Column()
    id_make: number;

    @ManyToOne(() => User, (user) => user.missionCreated)
    @JoinColumn({ name: "id_create" })
    creator: User;

    @ManyToOne(() => User, (user) => user.missionMade)
    @JoinColumn({ name: "id_make" })
    maker: User;
}