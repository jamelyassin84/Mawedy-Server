import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Patient } from '../patient/patient.entity'

@Entity()
export class PatientAvatar extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	url: string

	@Column()
	isActive: boolean

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
