import { ClinicPatient } from 'src/modules/clinic-patient/clinic-patient.entity'
import { Email } from 'src/modules/email/email.entity'
import { PatientAvatar } from 'src/modules/patient-avatar/patient-avatar.enitity'
import { Phone } from 'src/modules/phone/phone.entity'
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Patient extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	type: 'Walk-in' | 'App Patient'

	@Column()
	first: string

	@Column()
	middle: string

	@Column()
	last: string

	@Column()
	ext: string

	@Column()
	address: string

	@Column()
	sex: string

	@Column()
	religion: string

	@Column()
	dob: string

	@Column()
	city: string

	@Column()
	country: string

	@Column()
	age: string

	@OneToMany(() => Email, (email) => email.patient, {
		cascade: true,
	})
	emails?: Email[]

	@OneToMany(() => Phone, (phone) => phone.patient, {
		cascade: true,
	})
	phones?: Phone[]

	@OneToMany(() => PatientAvatar, (photo) => photo.patient, {
		cascade: true,
	})
	avatars?: PatientAvatar[]

	@OneToMany(() => ClinicPatient, (clinicPatient) => clinicPatient.patient, {
		cascade: true,
	})
	clinicPatient: ClinicPatient

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
