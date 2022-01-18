import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { PatientBookingList } from '../patient-booking-list/patient-booking-list.entity'

@Entity()
export class PatientBookingFollowUp extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	should_follow_up: boolean

	@ManyToOne(
		() => PatientBookingList,
		(patientBookingList) => patientBookingList.id,
	)
	patientBookingList: PatientBookingList

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updatedAt: Date
}
