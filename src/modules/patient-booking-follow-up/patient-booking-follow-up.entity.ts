import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { PatientBookingList } from '../patient-booking-list/patient-booking-list.entity'

@Entity()
export class PatientBookingFollowUp {
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
