import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, OneToOne } from "typeorm"
import { Address } from "./address.model";
import { User } from "./user.model";
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';


@ApiModel({
    description: 'Mission description',
    name: 'Mission',
})
@Entity()
export class Mission {
    @ApiModelProperty({
        description: 'id of missionnumber',
        example: ['123456789', '12345'],
        required: false,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty({
        description: 'link of picture',
        required: false,
    })
    @Column({ length: 250 , nullable : true})
    picture: string;

    @ApiModelProperty({
        description: 'status of mission as string',
        required: true,
    })
    @Column({ length: 50 })
    status: string;

    @ApiModelProperty({
        description: 'price of mission as number',
        required: true,
    })
    @Column()
    price: number;

    @ApiModelProperty({
        description: 'title of mission as string',
        required: true,
    })
	@Column({ length: 50 })
    title: string;

    @ApiModelProperty({
        description: 'description of mission as string',
        required: true,
    })
	@Column({ length: 250 })
    description: string;

    @ApiModelProperty({
        description: 'Date of mission as Date ',
        example: ["2022-04-09T23:00:00.000Z"],
        required: true,
    })
	@CreateDateColumn()
    creation_date: Date;

    @ApiModelProperty({
        description: 'id create as number',
        example: ['123456789', '12345'],
        required: true,
    })
	@Column()
    id_create: number;

    @ApiModelProperty({
        description: 'id make asnumber',
        example: ['123456789', '12345'],
        required: true,
    })
	@Column()
    id_make: number;

    @ManyToOne(() => User, (user) => user.missionCreated)
    @JoinColumn({ name: "id_create" })
    creator: User;

    @ManyToOne(() => User, (user) => user.missionMade)
    @JoinColumn({ name: "id_make" })
    maker: User;

    @ApiModelProperty({
        description: 'adress of mission',
        example: ['123456789', '12345'],
        required: false,
    })
    @OneToOne(() => Address, (address) => address.mission)
    address: Address;
}