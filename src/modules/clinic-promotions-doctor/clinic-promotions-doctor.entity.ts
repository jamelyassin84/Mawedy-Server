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

@Entity()
export class ClinicPromotionDoctor extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	isActive: boolean

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
	doctor: Doctor

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
