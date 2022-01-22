import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Clinic } from '../clinic/clinic.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Admin } from '../admin/admin.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

@Entity()
export class Device extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	device: string | null

	@Column()
	ipAddress: string | null

	@Column()
	macAddress: string | null

	@Column()
	browser: string | null

	@Column()
	isActive: boolean | true

	@Column()
	isLoggedIn: boolean | true

	@ManyToOne(() => Admin, (admin) => admin.id, {
		onDelete: 'CASCADE',
	})
	admin: Admin

	@ManyToOne(() => Clinic, (clinic) => clinic.id, {
		onDelete: 'CASCADE',
	})
	clinic: Clinic

	@ManyToOne(() => Patient, (patient) => patient.id, {
		onDelete: 'CASCADE',
	})
	patient: Patient

	@ManyToOne(() => Doctor, (doctor) => doctor.id, {
		onDelete: 'CASCADE',
	})
	doctor: Doctor

	@ManyToOne(() => ClinicAccount, (clinicAccount) => clinicAccount.id)
	ClinicAccount: ClinicAccount

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
