import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { AdminRoles } from '../admin/admin.dto'
import { Admin } from '../admin/admin.entity'

@Entity()
export class Role extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	role: AdminRoles

	@Column()
	isActive: boolean

	@ManyToOne(() => Admin, (admin) => admin.id, {
		cascade: true,
	})
	admin: Admin

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
