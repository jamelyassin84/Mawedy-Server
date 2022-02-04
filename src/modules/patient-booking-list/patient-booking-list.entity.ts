import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ClinicAppointment } from '../clinic-appointment/clinic-appointment.entity'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'

@Entity()
export class PatientBookingList extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	hasCanceled: boolean

	@Column()
	hasResult: boolean

	@Column()
	referenceNumber: number

	@ManyToOne(() => Doctor, (doctor) => doctor.id, {
		onDelete: 'CASCADE',
	})
	doctor: Doctor

	@ManyToOne(() => Clinic, (clinic) => clinic.id, {
		onDelete: 'CASCADE',
	})
	clinic: Clinic

	@ManyToOne(
		() => ClinicAppointment,
		(clinicAppointment) => clinicAppointment.id,
		{
			onDelete: 'CASCADE',
		},
	)
	clinicAppointment: ClinicAppointment

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
