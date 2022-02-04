import { ClinicMedicalService } from './../clinic-medical-service/clinic-medical-service.entity'
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

@Entity()
export class ClinicFollowUp extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Clinic, (clinic) => clinic.id, {
		onDelete: 'CASCADE',
	})
	clinic: Clinic

	@ManyToOne(() => Patient, (patient) => patient.id, {
		onDelete: 'CASCADE',
	})
	patient: Patient

	@ManyToOne(() => Doctor, (doctor) => doctor.id, {
		onDelete: 'CASCADE',
	})
	doctor: Doctor

	@ManyToOne(
		() => ClinicMedicalService,
		(clinicMedicalService) => clinicMedicalService.id,
		{
			onDelete: 'CASCADE',
		},
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
