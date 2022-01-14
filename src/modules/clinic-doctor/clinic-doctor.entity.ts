import { ClinicDepartmentDoctor } from '../clinic-department-doctor/clinic-department-doctor.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'

@Entity()
export class ClinicDoctor {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
	doctor: Doctor

	@ManyToOne(
		() => ClinicDepartmentDoctor,
		(clinicDepartmentDoctor) => clinicDepartmentDoctor.id,
	)
	clinicDepartmentDoctor: ClinicDepartmentDoctor

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
