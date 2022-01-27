import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'

@Entity()
export class ClinicTiming extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	openedAt: string | undefined | null

	@Column()
	closedAt: string | undefined | null

	@Column()
	day: string | undefined | null

	@Column()
	isAlwaysOpen: boolean

	@Column()
	clinicId: number

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
