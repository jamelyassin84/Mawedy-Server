import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Patient {
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
