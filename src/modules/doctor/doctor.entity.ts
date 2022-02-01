import { Clinic } from './../clinic/clinic.entity'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Doctor extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	avatar: string | null = null

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

	@OneToMany(() => Clinic, (clinic) => clinic.id, {
		onDelete: 'CASCADE',
	})
	clinic: Clinic

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
