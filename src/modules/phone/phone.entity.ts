import { Clinic } from '../clinic/clinic.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Admin } from '../admin/admin.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

@Entity()
export class Phone extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	userType: 'doctor' | 'patient' | 'clinic' | 'clinic_accounts' | 'admin'

	@Column()
	areaCode: number

	@Column()
	phone: number

	@Column()
	verificationCode: string | null

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

	@ManyToOne(() => ClinicAccount, (clinicAccount) => clinicAccount.id, {
		onDelete: 'CASCADE',
	})
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
