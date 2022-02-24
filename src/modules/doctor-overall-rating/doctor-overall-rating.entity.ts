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
export class DoctorOverAllRating extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	rating: number

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
