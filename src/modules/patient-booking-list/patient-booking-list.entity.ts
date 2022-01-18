import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ClinicAppointment } from '../clinic-appointment/clinic-appointment.entity'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'

@Entity()
export class PatientBookingList {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	has_canceled: boolean

	@Column()
	has_result: boolean

	@Column()
	referenceNumber: number

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
	doctor: Doctor

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(
		() => ClinicAppointment,
		(clinicAppointment) => clinicAppointment.id,
	)
	clinicAppointment: ClinicAppointment

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
