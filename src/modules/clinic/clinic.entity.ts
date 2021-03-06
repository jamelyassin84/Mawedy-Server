import { ClinicPhoto } from './../clinic-photos/clinic-photos.entity'
import { ClinicTiming } from './../clinic-timings/clinic-timings.entity'
import { ClinicFile } from './../clinic-file/clinic-file.entity'
import { Phone } from './../phone/phone.entity'
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
import { Email } from '../email/email.entity'
import { Device } from '../device/device.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { ClinicAvatar } from '../clinic-avatar/clinic-avatar.entity'
import { Doctor } from '../doctor/doctor.entity'

@Entity()
export class Clinic extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	address: string

	@Column()
	tradeLicenseNumber: string

	@Column()
	registeredVia: 'Web' | 'Sales' | 'Admin'

	@Column()
	username: string

	@Column()
	password?: string | null = null

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
	isApproved: boolean = false

	@Column()
	isActive: boolean

	@Column()
	isLoggedIn: boolean

	@Column()
	email: string

	@ManyToOne(() => Clinic, (clinic) => clinic.approver, {
		onDelete: 'CASCADE',
	})
	approver: Clinic

	@ManyToOne(() => Doctor, (doctor) => doctor.id, {})
	doctor: Doctor

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

	@OneToMany(() => ClinicAccount, (account) => account.clinic, {
		cascade: true,
	})
	clinicAccounts?: ClinicAccount[]

	@OneToMany(() => ClinicFile, (file) => file.clinic, {
		cascade: true,
	})
	files?: ClinicFile[]

	@OneToMany(() => ClinicPhoto, (photo) => photo.clinic, {
		cascade: true,
	})
	photos?: ClinicPhoto[]

	@OneToOne(() => ClinicAvatar, (photo) => photo.clinic, {
		cascade: true,
	})
	avatar?: ClinicAvatar

	@OneToMany(() => ClinicTiming, (timing) => timing.clinicId, {
		cascade: true,
	})
	clinicTimings?: ClinicTiming[]

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
