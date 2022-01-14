import { Admin } from '../admin/admin.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Clinic {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	address: string

	@Column()
	trade_license_number: number

	@Column()
	primary_device: string

	@Column()
	registeredVia: 'Web' | 'Sales' | 'Admin'

	@Column()
	username: string

	@Column()
	password: string

	@Column()
	avatar: string

	@Column()
	description: string

	@Column()
	longitude: number

	@Column()
	latitude: number

	@Column()
	instagram: string

	@Column()
	google: string

	@Column()
	facebook: string

	@Column()
	apple: string

	@Column()
	isApproved: string

	@Column()
	isActive: boolean

	@Column()
	isLoggedIn: boolean

	@OneToMany(() => Admin, (admin) => admin.id)
	approver: Admin

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
