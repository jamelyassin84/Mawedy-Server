import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Patient extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	type: 'Walk-in' | 'App Patient'

	@Column()
	first: string

	@Column()
	middle: string

	@Column()
	last: string

	@Column()
	ext: string

	@Column()
	address: string

	@Column()
	sex: string

	@Column()
	religion: string

	@Column()
	dob: string

	@Column()
	city: string

	@Column()
	country: string

	@Column()
	age: string

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
