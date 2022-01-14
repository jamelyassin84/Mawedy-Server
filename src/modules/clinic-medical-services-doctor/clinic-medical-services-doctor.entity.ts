import { ClinicServiceEntity } from './../clinic-service/clinic-service.entity'
import { ClinicMedicalService } from './../clinic-medical-service/clinic-medical-service.entity'
import { Clinic } from '../clinic/clinic.entity'
import { Roles } from '../role/roles.entity'
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Doctor } from '../doctor/doctor.entity'
import { ClinicDepartment } from '../clinic-department/clinic-department.enitiy'

@Entity()
export class ClinicMedicalServiceDoctor {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	isActive: boolean

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
	doctor: Doctor

	@ManyToOne(() => ClinicServiceEntity, (clinicService) => clinicService.id)
	clinicService: ClinicServiceEntity

	@ManyToOne(
		() => ClinicMedicalService,
		(clinicMedicalService) => clinicMedicalService.id,
	)
	clinicMedicalService: ClinicMedicalService

	@ManyToOne(
		() => ClinicDepartment,
		(clinicDepartment) => clinicDepartment.id,
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
