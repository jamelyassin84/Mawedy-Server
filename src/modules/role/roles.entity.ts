import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Admin } from '../admin/admin.entity'

@Entity()
export class Roles {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	role: string

	@Column()
	isActive: boolean

	@ManyToOne(() => Admin, (admin) => admin.id, {
		cascade: true,
	})
	admin: Admin[]

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
