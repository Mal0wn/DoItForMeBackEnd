import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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

	@Column()
    creation_date: Date;

	@Column()
    id_create: number;

	@Column()
    id_make: number;
}