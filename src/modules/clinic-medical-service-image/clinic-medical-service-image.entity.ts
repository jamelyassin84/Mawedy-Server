import { ClinicMedicalService } from './../clinic-medical-service/clinic-medical-service.entity'
import { ClinicServiceEntity } from './../clinic-service/clinic-service.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { ClinicDepartment } from '../clinic-department/clinic-department.enitiy'

@Entity()
export class ClinicMedicalServiceImage extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	url: string

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
