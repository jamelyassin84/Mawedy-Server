import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ClinicSubscription } from '../clinic-subscription/clinic-subscription.entity'
import { Clinic } from '../clinic/clinic.entity'

@Entity()
export class ClinicAccount extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	isActive: boolean

	@Column()
	isLoggedIn: boolean

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(
		() => ClinicSubscription,
		(clinicSubscription) => clinicSubscription.id,
	)
	clinicSubscription: ClinicSubscription

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
