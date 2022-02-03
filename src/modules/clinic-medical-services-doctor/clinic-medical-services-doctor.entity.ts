import { ClinicServiceEntity } from './../clinic-service/clinic-service.entity'
import { ClinicMedicalService } from './../clinic-medical-service/clinic-medical-service.entity'
import { Clinic } from '../clinic/clinic.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Doctor } from '../doctor/doctor.entity'
import { ClinicDepartment } from '../clinic-department/clinic-department.enitiy'

@Entity()
export class ClinicMedicalServiceDoctor extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	isActive: boolean

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

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

	@ManyToOne(
		() => ClinicDepartment,
		(clinicDepartment) => clinicDepartment.id,
		{
			onDelete: 'CASCADE',
		},
	)
	clinicDepartment: ClinicDepartment

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
