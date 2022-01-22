import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Notification extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	message: string

	@Column()
	fromType: NotificationType

	@Column()
	from: number

	@Column()
	toType: NotificationType

	@Column()
	to: number

	@Column()
	frontEndRedirectUrl: string

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

export type NotificationType =
	| 'admin'
	| 'clinic'
	| 'patient'
	| 'clinic_account'
	| 'system'
	| 'system'
