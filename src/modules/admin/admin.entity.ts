import { Phone } from './../phone/phone.entity'
import { Clinic } from '../clinic/clinic.entity'
import { Role } from '../role/roles.entity'
import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Email } from '../email/email.entity'
import { Device } from '../device/device.entity'
@Entity()
export class Admin extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		nullable: true,
	})
	username?: string

	@Column()
	password: string

	@Column({
		nullable: true,
	})
	avatar?: string

	@Column()
	isActive?: boolean | true

	@Column()
	isLoggedIn?: boolean | false

	@OneToMany(() => Role, (role) => role.admin, {
		cascade: true,
	})
	roles?: Role[]

	@OneToMany(() => Email, (email) => email.admin, {
		cascade: true,
	})
	emails?: Email[]

	@OneToMany(() => Phone, (phone) => phone.admin, {
		cascade: true,
	})
	phones?: Phone[]

	@OneToMany(() => Device, (device) => device.admin, {
		cascade: true,
	})
	devices?: Device[]

	@OneToMany(() => Clinic, (clinic) => clinic.approver, {
		cascade: true,
	})
	approvedClinics?: Clinic[]

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
