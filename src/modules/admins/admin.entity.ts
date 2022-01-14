import { Roles } from '../roles/roles.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Admin {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column()
	password: string

	@Column()
	avatar: string

	@Column()
	isActive: boolean

	@Column()
	isLoggedIn: boolean

	@ManyToOne(() => Roles, (role) => role.admin)
	roles: Roles[]

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
