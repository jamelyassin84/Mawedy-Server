import { Clinic } from '../clinic/clinic.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ClinicPromotion {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	valid_until: Date

	@Column()
	highlights: string

	@Column()
	termsAndConditions: string

	@Column()
	startAt: string

	@Column()
	discount: number

	@Column()
	isActive: boolean

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
