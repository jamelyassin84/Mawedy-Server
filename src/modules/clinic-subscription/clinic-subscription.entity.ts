import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ClinicSubscription extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	subscriptionType: 'app' | 'solution' | 'premium' | 'trial'

	@Column()
	subscribedAt: Date

	@Column()
	validUntil: Date

	@Column()
	maxNumberOfAccounts: number

	@Column()
	numberOfAccounts: number

	@Column()
	price: number

	@Column()
	currency: string | 'AED'

	@Column()
	isActive: boolean

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
