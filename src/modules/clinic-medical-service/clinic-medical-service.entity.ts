import { ClinicServiceEntity } from './../clinic-service/clinic-service.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'
import { ClinicDepartment } from '../clinic-department/clinic-department.enitiy'
import { ClinicMedicalServiceImage } from '../clinic-medical-service-image/clinic-medical-service-image.entity'
import { ClinicDepartmentDoctor } from '../clinic-department-doctor/clinic-department-doctor.entity'
import { ClinicMedicalServiceDoctor } from '../clinic-medical-services-doctor/clinic-medical-services-doctor.entity'

@Entity()
export class ClinicMedicalService extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	isActive: boolean

	@ManyToOne(() => Clinic, (clinic) => clinic.id, {
		onDelete: 'CASCADE',
	})
	clinic: Clinic

	@ManyToOne(() => ClinicDepartment, (department) => department.id)
	department: ClinicDepartment

	@OneToMany(
		() => ClinicMedicalServiceImage,
		(image) => image.clinicMedicalService,
	)
	images: ClinicMedicalServiceImage

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
