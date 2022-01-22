import { PatientBookingList } from './../patient-booking-list/patient-booking-list.entity'
import { Clinic } from '../clinic/clinic.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Patient } from '../patient/patient.entity'
import { Doctor } from '../doctor/doctor.entity'
import { ClinicPromotion } from '../clinic-promotion/clinic-promotion.entity'

@Entity()
export class ClinicAppointment extends BaseEntity {
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
	status: AppointmentStatus

	@Column()
	booking_reference: string

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => Patient, (patient) => patient.id)
	patient: Patient

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
	doctor: Doctor

	@ManyToOne(() => Doctor, (bookingList) => bookingList.id)
	bookingList: PatientBookingList

	@ManyToOne(() => Doctor, (clinicPromotion) => clinicPromotion.id)
	clinicPromotion: ClinicPromotion

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

export type AppointmentStatus = 'canceled' | 'attended' | null
