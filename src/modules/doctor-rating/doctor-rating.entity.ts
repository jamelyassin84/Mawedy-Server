import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { Doctor } from '../doctor/doctor.entity'

@Entity()
export class DoctorRating {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	rating: number

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
	doctor: Doctor

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

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
