import { Clinic } from './../clinic/clinic.entity'
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Admin } from '../admins/admin.entity'

@Entity()
export class Device {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	device: string

	@Column()
	ip_address: string

	@Column()
	mac_address: string

	@Column()
	browser: string

	@Column()
	isActive: boolean

	@ManyToOne(() => Admin, (admin) => admin.id)
	admin: Admin

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	// @ManyToOne(() => Admin, (admin) => admin.id)
	// patient: Admin

	// @ManyToOne(() => Admin, (admin) => admin.id)
	// doctor: Admin

	// @ManyToOne(() => Admin, (admin) => admin.id)
	// clinic_account: Admin

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
