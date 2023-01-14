import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Mission } from "./mission.model";
import { User } from "./user.model";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: Date;

    @Column({ length: 250 })
    message: string;

    @Column()
    id_send: number;

	@Column()
    id_receive: number;

    @Column()
    id_mission: number;

    @ManyToOne(() => User, (sender) => sender.sent)
    @JoinColumn({ name: "id_send" })
    sender: User;

    @ManyToOne(() => User, (receiver) => receiver.received)
    @JoinColumn({ name: "id_receive" })
    receiver: User;
    
    @ManyToOne(() => Mission, (mission) => mission.messages)
    @JoinColumn({ name: "id_mission"})
    mission: Mission;
}