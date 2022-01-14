import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Clinic } from '../clinic/clinic.entity'
import { Patient } from '../patient/patient.entity'

@Entity()
export class PatientSearch {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	keyword: string

	@Column()
	results: string

	@Column()
	type: 'clinic' | 'doctor'

	@ManyToOne(() => Patient, (patient) => patient.id)
	patient: Patient

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
