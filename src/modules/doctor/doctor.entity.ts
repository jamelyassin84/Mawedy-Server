import { Clinic } from './../clinic/clinic.entity'
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ClinicDoctorWorkingSchedule } from '../clinic-doctor-working-schedule/clinic-doctor-working-schedule.entity'
import { Email } from '../email/email.entity'
import { Phone } from '../phone/phone.entity'
import { ClinicDoctor } from '../clinic-doctor/clinic-doctor.entity'

@Entity()
export class Doctor extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		nullable: true,
	})
	avatar?: string | null = null

	@Column()
	name: string

	@Column()
	title: string

	@Column()
	profession: string | null = null

	@Column()
	specialties: string | null = null

	@Column()
	yearsOfExperience: number

	@Column()
	about: string | null = null

	@Column()
	isAvailable: boolean = true

	@Column()
	isActive: boolean = true

	@OneToMany(() => Email, (email) => email.clinic, {
		cascade: true,
	})
	emails?: Email[]

	@OneToMany(() => Phone, (phone) => phone.clinic, {
		cascade: true,
	})
	phones?: Phone[]

	@OneToMany(
		() => ClinicDoctorWorkingSchedule,
		(clinicDoctorWorkingSchedule) => clinicDoctorWorkingSchedule.doctor,
		{
			onDelete: 'CASCADE',
		},
	)
	clinicDoctorWorkingSchedules: ClinicDoctorWorkingSchedule[]

	@OneToMany(() => ClinicDoctor, (clinicDoctor) => clinicDoctor.doctors, {
		onDelete: 'CASCADE',
	})
	clinicDoctors: ClinicDoctor[]

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
