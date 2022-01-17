import { Clinic } from '../clinic/clinic.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Patient } from '../patient/patient.entity'
import { Doctor } from '../doctor/doctor.entity'

@Entity()
export class ClinicAppointment {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	bookedThrough: 'app' | 'walk-in'

	@Column()
	date: string

	@Column()
	time: string

	@Column()
	appointment_type: 'app' | 'walk-in'

	@Column()
	comments: string

	@Column()
	status: 'canceled' | 'attended' | null

	@Column()
	booking_reference: string

	@Column()
	appointment_date: Date

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => Patient, (patient) => patient.id)
	patient: Patient

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
	doctor: Doctor

	// @ManyToOne(() => Doctor, (bookingList) => bookingList.id)
	// bookingList: Doctor

	// @ManyToOne(() => Doctor, (clinicPromotion) => clinicPromotion.id)
	// clinicPromotion: Doctor

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
