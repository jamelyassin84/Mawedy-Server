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
import { ClinicAccount } from '../clinic-account/clinic-account.entity'
import { Patient } from '../patients/patient/patient.entity'

@Entity()
export class Log extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	role: string

	@Column()
	isActive: boolean

	@ManyToOne(() => Admin, (admin) => admin.id)
	admin: Admin

	@ManyToOne(() => Clinic, (clinic) => clinic.id)
	clinic: Clinic

	@ManyToOne(() => Patient, (patient) => patient.id)
	patient: Patient

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
