import { ClinicMedicalService } from './../clinic-medical-service/clinic-medical-service.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

@Entity()
export class ClinicFollowUp {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => Patient, (patient) => patient.id)
	patient: Patient

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
	doctor: Doctor

	@ManyToOne(
		() => ClinicMedicalService,
		(clinicMedicalService) => clinicMedicalService.id,
	)
	clinicMedicalService: ClinicMedicalService

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
