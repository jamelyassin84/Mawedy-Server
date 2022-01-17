import { Phone } from './../phone/phone.entity'
import { Admin } from '../admin/admin.entity'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Role } from '../role/roles.entity'
import { Email } from '../email/email.entity'
import { Device } from '../device/device.entity'

@Entity()
export class Clinic extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	address: string

	@Column()
	tradeLicenseNumber: number

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

	@ManyToOne(() => Clinic, (clinic) => clinic.approver, {
		onDelete: 'CASCADE',
	})
	approver: Clinic

	@OneToMany(() => Email, (email) => email.clinic, {
		cascade: true,
	})
	emails?: Email[]

	@OneToMany(() => Phone, (phone) => phone.clinic, {
		cascade: true,
	})
	phones?: Phone[]

	@OneToMany(() => Device, (device) => device.clinic, {
		cascade: true,
	})
	devices?: Device[]

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

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 8)
	}

	async validatePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password)
	}
}
