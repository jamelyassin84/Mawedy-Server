import { Clinic } from './../clinic/clinic.entity'
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Admin } from '../admins/admin.entity'
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Doctor } from '../doctor/doctor.entity'
import { Patient } from '../patient/patient.entity'

@Entity()
export class Phone {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	userType: 'doctor' | 'patient' | 'clinic' | 'clinic_accounts' | 'admin'

	@Column()
	areaCode: number

	@Column()
	phone: number

	@Column()
	verificationCode: string

	@ManyToOne(() => Admin, (admin) => admin.id)
	admin: Admin

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => Patient, (patient) => patient.id)
	patient: Patient

	@ManyToOne(() => Doctor, (doctor) => doctor.id)
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
