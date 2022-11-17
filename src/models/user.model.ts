import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Address } from "./address.model";
import { Mission } from "./mission.model";
import { ApiModel, ApiModelProperty } from 'swagger-express-ts';


@ApiModel({
    description: 'User description',
    name: 'User',
})
@Entity()
export class User {
    @ApiModelProperty({
        description: 'Id of user as number',
        example: ['123456789', '12345'],
        required: false,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty({
        description: 'First name of user as string',
        example: ['Homer'],
        required: true,
    })
    @Column({ length: 50 })
    firstname: string;

    @ApiModelProperty({
        description: 'Last name of user as string',
        example: ['Simpson'],
        required: true,
    })
    @Column({ length: 50 })
    lastname: string;

    @ApiModelProperty({
        description: 'Email of user',
        example: ['homer.s@groening.com'],
        required: true,
    })
    @Column({ length: 250 })
    email: string;

    @ApiModelProperty({
        description: 'Password of user as string',
        example: ['MargeIsSoBrave33'],
        required: true,
    })
    @Column({length: 250 })
    password: string;

    @ApiModelProperty({
        description: 'Link picture of user as string',
        example: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToeIaTt2-8KPARnXqb5OLUzeRZpgCPNiRyWg&usqp=CAU'],
        required: true,
    })
    @Column({ length: 250, nullable: true })
    picture: string;

    @ApiModelProperty({
        description: 'Birthday of user as date',
        example: ['1968-04-09T23:00:00.000Z'],
        required: true,
    })
    @Column()
    birthday: Date;

    @ApiModelProperty({
        description: 'role of user as string',
        example: ['Admin or User'],
        required: true,
    })
    @Column({ length: 20})
    role: string;

    @ApiModelProperty({
        description: 'Phone of user as number',
        example: ['0706050403'],
        required: true,
    })
    @Column()
    phone: number;


    @ApiModelProperty({
            description: '',
            example: [''],
            required: false,
        })
    @OneToMany(() => Mission, (mission) => mission.creator)
    missionCreated: Mission[];


    @ApiModelProperty({
        description: '',
        required: false,
    })
    @OneToMany(() => Mission, (mission) => mission.maker)
    missionMade: Mission[];

    @ApiModelProperty({
        description: 'Adress of user as adress',
        example: [''],
        required: false,
    })
    @OneToMany(() => Address, (address) => address.user)
    address: Address[];
}