import { ClinicMedicalService } from './../clinic-medical-service/clinic-medical-service.entity'
import { ClinicServiceEntity } from './../clinic-service/clinic-service.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { ClinicDepartment } from '../clinic-department/clinic-department.enitiy'

@Entity()
export class ClinicMedicalServiceImage {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	url: string

	@Column()
	isActive: boolean

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => ClinicServiceEntity, (clinicService) => clinicService.id)
	clinicService: ClinicServiceEntity

	@ManyToOne(
		() => ClinicDepartment,
		(clinicDepartment) => clinicDepartment.id,
	)
	clinicDepartment: ClinicDepartment

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
