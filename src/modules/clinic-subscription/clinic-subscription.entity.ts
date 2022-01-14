import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ClinicSubscription {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	subscription_type: 'app' | 'solution' | 'premium' | 'trial'

	@Column()
	subscribedAt: Date

	@Column()
	validUntil: Date

	@Column()
	numberOfAccounts: number

	@Column()
	price: number

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
